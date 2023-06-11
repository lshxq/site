<template lang="pug">
.flex-center.container
  .square 
    .item 
      img(:src="img1")
    .item 
      img(:src="img2")
    .item
      img(:src="img3")
    .item 
      img(:src="img4")
    .item 
      img(:src="img5")

</template>

<script>
export default {
  props: {
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
  },
};
</script>

<style scoped>
.square {
  --r: 360deg;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 5px;
  grid-template:
    "a a b"
    "d e b"
    "d c c";
  animation: rotating-img-comp-ani 10s linear infinite;
}

.item > img {
  width: 260%;
  height: 260%;
  object-fit: cover;
  --r: -360deg;
  animation: rotating-img-comp-ani 10s linear infinite;
}

@keyframes rotating-img-comp-ani {
  to {
    transform: rotate(var(--r));
  }
}
</style>

<style lang="sass" scoped>

.container
  height: 500px

  .square

    width: 400px
    height: 400px

    .item
      overflow: hidden
      border: 1px solid black
      display: flex
      justify-content: center
      align-items: center


    .item:nth-child(1)
      grid-area: a
    .item:nth-child(2)
      grid-area: b
    .item:nth-child(3)
      grid-area: c
    .item:nth-child(4)
      grid-area: d
    .item:nth-child(5)
      grid-area: e
</style>
