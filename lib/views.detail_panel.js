KPivotViewer.Views.detail_panel = {};

KPivotViewer.Views.detail_panel.panel_template = '<p> \
      <a href="javascript: KPivotViewer.Views.detail_panel.goto_prev_candidate();" class="button-prev-candidate"> \
        <img src="/images/info_panel_left.png" /> \
      </a>&nbsp; \
      <a href="javascript: KPivotViewer.Views.detail_panel.goto_next_candidate();" class="button-next-candidate"> \
        <img src="/images/info_panel_right.png" /> \
      </a> \
    </p> \
    <h5 class="candidate-name">Detail panel</h5> \
    <p> \
      <a class="candidate-url" href="#">Click here to view reports</a> \
    </p> \
    <p> \
      <ul class="candidate-facets"></ul> \
    </p>'
KPivotViewer.Views.detail_panel.selector = "#detail-panel";

KPivotViewer.Views.detail_panel.init = function(options){
  if(options.selector != undefined){
    KPivotViewer.Views.detail_panel.selector = options.selector;
  }
  $(KPivotViewer.Views.detail_panel.selector).html(KPivotViewer.Views.detail_panel.panel_template).hide();
}

KPivotViewer.Views.detail_panel.hide = function() {
  $(KPivotViewer.Views.detail_panel.selector).hide();
  if(KPivotViewer.Views.view_mode == KPivotViewer.Views.COLUMN_MODE){
    KPivotViewer.Views.layer3.show();
  }
}

KPivotViewer.Views.detail_panel.goto_next_candidate = function(){
  if(KPivotViewer.Views.view_mode == KPivotViewer.Views.COLUMN_MODE){
    KPivotViewer.Views.detail_panel.prev_candidate();
  }else{
    KPivotViewer.Views.detail_panel.next_candidate();
  }
};

KPivotViewer.Views.detail_panel.goto_prev_candidate = function(){
  if(KPivotViewer.Views.view_mode == KPivotViewer.Views.COLUMN_MODE){
    KPivotViewer.Views.detail_panel.next_candidate();
  }else{
    KPivotViewer.Views.detail_panel.prev_candidate();
  }
};


KPivotViewer.Views.detail_panel.next_candidate = function(){
  cur = KPivotViewer.Models.current_filter.indexOf(KPivotViewer.Models.current_focus);
  if(cur > -1 && cur < KPivotViewer.Models.current_filter.length - 1){
    KPivotViewer.Models.current_focus = KPivotViewer.Models.current_filter[cur+1];
    KPivotViewer.Views.focus_to(KPivotViewer.Views.candidate_images[KPivotViewer.Models.current_filter[cur+1]]);
  }
  return false;
}

KPivotViewer.Views.detail_panel.prev_candidate = function(){
  cur = KPivotViewer.Models.current_filter.indexOf(KPivotViewer.Models.current_focus);
  if(cur >= 1){
    KPivotViewer.Models.current_focus = KPivotViewer.Models.current_filter[cur-1];
    KPivotViewer.Views.focus_to(KPivotViewer.Views.candidate_images[KPivotViewer.Models.current_filter[cur-1]]);
  }
  return false;
};

KPivotViewer.Views.detail_panel.show = function(candidate) {
  KPivotViewer.Views.layer3.hide();
  KPivotViewer.Views.layer3.draw();

  $detail = $(KPivotViewer.Views.detail_panel.selector);

  $detail.find('.candidate-name').html(candidate.name);
  if(candidate.url == ""){
    $detail.find('a.candidate-url').hide();
  }else{
    $detail.find('a.candidate-url').attr('href',candidate.url).show();
  }
  $facets = $detail.find('.candidate-facets').html('');
  for (var i = 0; i < KPivotViewer.Models.facets.length; i++) {
    li_class = 'odd';
    if(i % 2 == 0){
      li_class = 'even';
    }
    if(KPivotViewer.Models.facets[i].type == 'number'){
      $facets.append('<li class="detail-facet '+li_class+'">' + KPivotViewer.Models.facets[i].name + '<br/><strong>' + (Math.round(candidate.facets[i]*100)/100) + '</strong></li>');
    }else if(KPivotViewer.Models.facets[i].type == 'string'){
      $facets.append('<li class="detail-facet '+li_class+'">' + KPivotViewer.Models.facets[i].name + '<br/><strong>' + KPivotViewer.Models.facets[i].labels[candidate.facets[i]] + '</strong></li>');
    }
  };

  $detail.show();
}