import _ from 'lodash';

var headers = function (schema){
	return  _.filter(
			 _.sortBy(schema.properties, function(prop){  
				return _.property(`render.options.fields.${prop.id}.order`)(schema) 
			})
		, (obj) => {
			return (obj !== '')
		})
}

export {headers}