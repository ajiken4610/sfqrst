<template>
  <Teleport to="body">
    <div :class="className">
      <div class="mdc-snackbar__surface">
        <div class="mdc-snackbar__label">{{ props.message }}</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ message: string }>();
const state = reactive({
  open: false,
  opening: true,
  opened: false,
  options: {
    className: "",
    timeoutMs: 2750,
    message: "",
    position: "bottom",
  },
});

const positionClassName = computed(() =>
  ["top", "center"].includes(state.options.position)
    ? `mdc-toast--${state.options.position}`
    : ""
);
const className = computed(() => [
  "mdc-snackbar",
  "mdc-toast",
  positionClassName.value,
  state.options.className,
  {
    "mdc-snackbar--opening": state.opening,
    "mdc-snackbar--open": state.opened,
  },
]);

watch(
  () => state.open,
  (val) => {
    if (val) {
      // animation
      setTimeout(() => {
        state.opened = true;
        setTimeout(() => {
          state.opening = false;
        }, 150);
      }, 150);
    } else {
      // reset
      state.opening = true;
      state.opened = false;
    }
  }
);

function hide() {
  state.open = false;
}
function show() {
  state.open = true;
  // hide toast
  setTimeout(() => hide(), state.options.timeoutMs);
}
watch(toRef(props, "message"), () => {
  console.log(props.message);
  show();
});
</script>
