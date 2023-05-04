<script setup lang="ts">
import LoaderSpinnner from 'src/shared/components/LoaderSpinnner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import IssueList from '../components/issue-list/IssueList.vue';
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">Github issues</span>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12 col-md-4">
      <!-- TODO: Filtros -->

      <FilterSelector />
    </div>

    <div class="col-xs-12 col-md-8">
      <!-- TODO: Loader -->
      <LoaderSpinnner />

      <IssueList />
    </div>
  </div>
</template>

<style scoped></style>
