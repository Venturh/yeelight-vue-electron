<template>
  <div class="section">
    <h1>Rooms</h1>
    <div class="cards">
      <Card
        v-for="(room, index) in rooms"
        :key="index"
        type="Room"
        :name="room.name"
        :bulbs="room.devices"
        @action="toggleCardOverlay"
      />
      <AddCard @add="toggleAddRoomOverlay" />
    </div>
    <div class="overlay">
      <transition name="toggle">
        <CardOverlay v-if="showOverlay" @toggle="toggleCardOverlay" v-bind="selected" />
      </transition>
    </div>
    <div class="add-room-overlay">
      <transition name="toggle">
        <AddOverlay
          v-if="showAddRoomOverlay"
          type="room"
          :devices="devices"
          @toggleAddRoomOverlay="toggleAddRoomOverlay"
          @addRoom="addNewRoom"
        />
      </transition>
    </div>
    <div v-if="showAddRoomOverlay" class="overlay-background" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Card from '@/components/Card.vue';
import AddCard from '@/components/AddCard.vue';
import CardOverlay from '@/components/overlays/CardOverlay.vue';
import AddOverlay from '@/components/overlays/AddOverlay/index.vue';
export default {
  components: { Card, AddCard, CardOverlay, AddOverlay },
  computed: {
    ...mapState('yeelight', {
      devices: state => state.devices,
    }),
    ...mapState('rooms', {
      rooms: state => state.rooms,
    }),
  },
  methods: {
    ...mapActions('rooms', ['addRoom']),
    toggleCardOverlay(item) {
      this.selected = item;
      this.showOverlay = !this.showOverlay;
    },
    toggleAddRoomOverlay() {
      this.showAddRoomOverlay = !this.showAddRoomOverlay;
    },
    addNewRoom({ name, devices }) {
      this.toggleAddRoomOverlay();
      this.addRoom({ name, devices });
    },
  },
  data() {
    return {
      showOverlay: false,
      selected: {},
      showAddRoomOverlay: false,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  max-width: 100vw;
  overflow: hidden;
}
.add-room-overlay {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 1;
}

.overlay-background {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;

  opacity: 0.9;
  backdrop-filter: blur(2px);
}
</style>
