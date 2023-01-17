<template>
  <div
    class="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[#e6e7eec0]"
    @click="$emit('cancel')"
  >
    <div @click.stop>
      <AppCard class="w-[500px] h-min flex flex-col p-0">
        <div
          class="flex justify-between p-6 border-b-[0.0625rem] border-[#2628330d]"
        >
          <p>
            <slot name="header"></slot>
          </p>
          <button type="button" @click="closeModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                fill="rgba(0,0,0,0.6)"
              />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <p class="pb-4 font-light">
            <slot></slot>
          </p>
        </div>
        <div
          class="flex justify-between p-6 border-t-[0.0625rem] border-[#2628330d]"
        >
          <AppButton
            class="text-success"
            title="Confirm"
            @click="confirmAction"
          />
          <AppButton class="text-danger" title="Cancel" @click="closeModal" />
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'
import AppCard from './AppCard.vue'

export default {
  components: { AppCard, AppButton },
  emits: ['confirm', 'cancel'],
  setup(_, { emit }) {
    const closeModal = () => emit('cancel')

    const confirmAction = () => emit('confirm')

    return {
      closeModal,
      confirmAction,
    }
  },
}
</script>

<style></style>
