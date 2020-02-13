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

  describe('loadVideos', () => {
    it('with correct response', async () => {
      const wrapper = shallowMount(VideoFeed, {
        mocks: { axios },
      });

      axios.get = jest.fn().mockReturnValue(Promise.resolve({ data: [{ id: '1' }] }));

      axios.get.mockClear();

      await wrapper.vm.loadVideos();
      expect(axios.get).toBeCalled();
    });

    it('should contains VideoItem', async () => {
      const wrapper = mount(VideoFeed, {
        mocks: { axios },
      });

      axios.get = jest.fn().mockReturnValue(Promise.resolve({ data: [{ id: '1' }] }));

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
