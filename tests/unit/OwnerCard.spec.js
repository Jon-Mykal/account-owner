import HelloWorld from '@/components/HelloWorld.vue'
import { mount } from '@vue/test-utils'

describe('OwnerCard', () => {
  it('renders props.msg when passed', () => {
    // const owner = {

    // };
    const wrapper = mount(HelloWorld);
    
    expect(wrapper.isVisible()).toBe(true);
  })
})
