<template>
  <div class="py-[5px] px-[10px]">
    <ul class="flex gap-8 flex-col py-2 md:flex-row md:py-4">
      <li
        class="w-full bg-primary text-[#44476a] "
      >
        <NuxtLink class="w-full flex justify-center p-3 shadow-soft rounded  border-light" to="/"
          >List Of Notes</NuxtLink
        >
      </li>
      <li
        class="w-full bg-primary text-[#44476a] "
      >
        <NuxtLink class="w-full flex justify-center p-3 shadow-soft rounded border-light" to="/note"
          >Create Note</NuxtLink
        >
      </li>
    </ul>
    <hr class="my-6 border-t-[0.0625rem] border-[#2628330d]" />

    <Nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
