/**
	**options to have following keys:
		**searchText: this should hold the value of search text
		**searchPlaceHolder: this should hold the value of search input box placeholder
**/
(function($){
	$.fn.tableSearch = function(options){
		if(!$(this).is('table')){
			return;
		}
		var tableObj = $(this),
			latestUpdateDate = (options.latestUpdateDate)?options.latestUpdateDate:'',
			searchPlaceHolder = (options.searchPlaceHolder)?options.searchPlaceHolder:'',
			divObj = $('<div class="input-group custom-search-form"></div>'),
			inputObj = $('<input type="text" class="form-control" placeholder="'+searchPlaceHolder+'" />'),
			logoObj = $('<span class="input-group-btn"> <button class="btn btn-default" type="button"> <i class="fa fa-search"></i> </button>'),
			caseSensitive = (options.caseSensitive===true)?true:false,
			searchFieldVal = '',
			pattern = '';
		inputObj.off('keyup').on('keyup', function(){
			searchFieldVal = $(this).val();
			pattern = (caseSensitive)?RegExp(searchFieldVal):RegExp(searchFieldVal, 'i');
			tableObj.find('tbody tr').hide().each(function(){
				var currentRow = $(this);
				currentRow.find('td').each(function(){
					if(pattern.test($(this).html())){
						currentRow.show();
						return false;
					}
				});
			});
		});
		tableObj.before(divObj.append(inputObj).append(logoObj));
		return tableObj;
	}
}(jQuery));