var KPivotViewer = KPivotViewer || {};
KPivotViewer.init = function(source, facets, options) {
  KPivotViewer.Models.init(source, facets);
  KPivotViewer.Views.init(options);

  KPivotViewer.Views.filters.init(options.slider_selector, facets);
  $(options.slider_selector).accordion();
  KPivotViewer.Views.init_sorter();
}
KPivotViewer.clear_filter = function(){
  KPivotViewer.Views.filters.reset();
}