<template>
  <div class="inventory flex flex-col w-screen md:space-y-4 pt-10">
    <div class="overflow-auto px-2 md:px-6 h-screen pb-24 font-semibold">
      <h1 class="text-3xl">User: {{ profile.username }}</h1>
      <h1 class="text-6x1">Anzahl: {{ profile.inventory.length }}</h1>
      <p class="hidden">{{ profile.inventory[0].floatvalue }}</p>
      <div class="grid md:grid-cols-10 grid-cols-2 gap-x-2 gap-y-2">
        <div v-for="item in profile.inventory" :key="item.id">
          <Item :name="item.name" :icon_url="item.icon_url" :condition_short="item.condition_short" :floatvalue="item.floatvalue"></Item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryService from '../InventoryService.js'
import Item from '../components/Item.vue'

export default {
  name: 'Inventory',
    components: {
        Item
    },
  data() {
    return {
      profile: {
        username: '',
        inventory: [],
      },
      error: ''
    }
  },
  async created() {
    try {
        this.profile.inventory = await InventoryService.getItems(this.$route.query.steamid); // if steamid is not set, it will load logged in user's inventory
    } catch (error) {
        this.error = error.message;
    }
  },
  async mounted(){
    try {
      // loop through all items and set floatvalue to outpute from InventoryService.getItemFloat(item)
      for (let i = 0; i < this.profile.inventory.length; i++) {
        this.profile.inventory[i].floatvalue = await InventoryService.getItemFloat(this.profile.inventory[i]);
      }
    } catch (error) {
      console.log(error)
      this.error = error.message;
    }
  }
}
</script>