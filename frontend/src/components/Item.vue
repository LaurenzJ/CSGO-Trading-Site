<template>
  <div class="relative rounded-sm bg-gray-100 shadow-lg dark:bg-gray-800">
    <svg v-on:mouseover="active = true" v-on:mouseout="active = false" 
      class="hover:text-blue-500 float-right m-2 h-4 w-4 text-black" 
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
    
    <div class="p-2" v-if="active">
      <p class="absolute text-xs">{{item.name}}</p>
    </div>

    <img :src="item.icon_url" :alt="name" class="object-contain w-full h-20 mt-2" />
  
    <div class="row px-4 py-2 bg-gray-900">
      <h1 class="text-xs font-bold text-white">
        {{ item.condition_short }} / {{ formatFloatvalue(item.floatvalue) }}
      </h1>
      <h1 class="text-sm font-bold text-white">$ 999.99</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  data() {
    return {
      active: false,
    };
  },
  props: {
    item: Object,
  },
  methods: {
    formatFloatvalue(value) {
      if (value == 0) return "No float";
      let val = value?.toFixed(4);
      return val?.toString();
    },
  },
};
</script>