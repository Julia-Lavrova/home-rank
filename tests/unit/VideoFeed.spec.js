import { shallowMount, mount } from '@vue/test-utils';
import VideoFeed from '@/components/VideoFeed.vue';
import VideoItem from '@/components/VideoItem.vue';
import axios from 'axios';

describe('VideoFeed.vue', () => {
  it('should load videos on mount', () => {
    const spy = jest.fn();
    shallowMount(VideoFeed, { methods: { loadVideos: spy } });

    expect(spy).toBeCalled();
  });

  it('should check previous session on mount', () => {
    const spy = jest.fn();
    shallowMount(VideoFeed, { methods: { checkSession: spy } });

    expect(spy).toBeCalled();
  });

  it('handleResetClick should reset votes', () => {
    const spy = jest.fn();
    const wrapper = shallowMount(VideoFeed, { methods: { updateVotes: spy } });
    wrapper.vm.votes = { id: 5 };

    wrapper.vm.checkSession();

    expect(wrapper.vm.votes).toEqual({});
  });

  it('updateVotes should update votes in localStorage', () => {
    const wrapper = shallowMount(VideoFeed);
    const votes = { id: 5 };
    wrapper.vm.votes = votes;

    wrapper.vm.updateVotes();

    expect(window.localStorage.getItem('votes')).toBe(JSON.stringify(votes));
  });

  describe('handleVoteClick', () => {
    it('should set new id with one vote', async () => {
      const wrapper = shallowMount(VideoFeed);
      wrapper.vm.votes = {};
      wrapper.vm.handleVoteClick(123);

      expect(window.localStorage.getItem('votes')).toBe(JSON.stringify({ 123: 1 }));
    });

    it('should increase votes for exist id', async () => {
      const wrapper = shallowMount(VideoFeed);
      wrapper.vm.votes = { 123: 1 };
      wrapper.vm.handleVoteClick(123);

      expect(window.localStorage.getItem('votes')).toBe(JSON.stringify({ 123: 2 }));
    });
  });

  describe('checkSession', () => {
    it('if there is not lastSessionDay should set new Date()', async () => {
      const wrapper = shallowMount(VideoFeed);

      expect(new Date(window.localStorage.getItem('lastSessionDay')).getDate()).toBe(new Date().getDate());
    });

    it('if lastSessionDay < today should set new lastSessionDay', async () => {
      const wrapper = shallowMount(VideoFeed);
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

      window.localStorage.setItem('lastSessionDay', yesterday);

      wrapper.vm.checkSession();

      expect(new Date(window.localStorage.getItem('lastSessionDay')).getDate()).toBe(new Date().getDate());
    });

    it('if lastSessionDay < today should reset votes', async () => {
      const wrapper = shallowMount(VideoFeed);
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

      window.localStorage.setItem('lastSessionDay', yesterday);
      window.localStorage.setItem('votes', JSON.stringify({ id: 5 }));

      wrapper.vm.checkSession();

      expect(wrapper.vm.votes).toEqual({});
    });

    it('should update votes', async () => {
      const wrapper = shallowMount(VideoFeed);

      window.localStorage.setItem('votes', JSON.stringify({ id: 5 }));

      wrapper.vm.checkSession();

      expect(wrapper.vm.votes).toEqual({ id: 5 });
    });
  });

  describe('loadVideos', () => {
    it('with correct response', async () => {
      const wrapper = shallowMount(VideoFeed, {
        mocks: { axios },
      });

      axios.get = jest.fn().mockReturnValue(Promise.resolve({ data: [{ id: 1 }] }));

      axios.get.mockClear();

      await wrapper.vm.loadVideos();
      expect(axios.get).toBeCalled();
    });

    it('should contains VideoItem', async () => {
      const wrapper = mount(VideoFeed, {
        mocks: { axios },
      });

      axios.get = jest.fn().mockReturnValue(Promise.resolve({ data: [{ id: 1 }] }));

      await wrapper.vm.loadVideos();

      expect(wrapper.contains(VideoItem)).toBe(true);
    });

    it('with error', async () => {
      const error = new Error('loading error');
      const wrapper = shallowMount(VideoFeed, {
        mocks: { axios },
      });

      axios.get = jest.fn().mockReturnValue(Promise.reject(error));
      axios.get.mockClear();

      await wrapper.vm.loadVideos();
      expect(wrapper.vm.error).toBe(error);
    });
  });
});
