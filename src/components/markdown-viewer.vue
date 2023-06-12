<template lang="pug">
.markdown-viewer-main 
  mavon-editor.mavon-view-panel(
      :model-value='markdown' 
      :editable='false'
      :toolbarsFlag='false'
      :subfield='false'
      :boxShadow='false'
      default-open="preview"
      previewBackground='white')
</template>

<script> 
export default {
  props: {
    markdown: String
  },
}
</script>