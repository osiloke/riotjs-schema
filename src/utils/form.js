import _ from 'lodash';
import riot from 'riot';

var reflectionSet = function(obj, prop, value) {
	// reflectionSet(self.data, id, v)
  prop = prop.split('.');
  var root = obj, i;
  var last_root;
  for(i=0; i<prop.length; i++) { 
      if(typeof root[prop[i]] == 'undefined') root[prop[i]] = {};
      if (i === prop.length-1 && value === null){
      	delete root[prop[i]]  
      	if (typeof last_root !== 'undefined' && _.isEmpty(last_root[prop[i-1]])){ 
      		delete last_root[prop[i-1]]
      	}
      }else{ 
        if(i === prop.length - 1) root[prop[i]] = value;
        last_root = root
        root = root[prop[i]];
      }

  }
  return obj;
}

var createInputField = function (schema, parent, field, tag_type, type, parent_el) {  
	let el = document.createElement('div')
	el.setAttribute('name', field.id)
	if (parent_el){
		parent_el.appendChild(el)
	}else{
		parent.root.appendChild(el)
	}
	let opts = { 
		field: field,
		parent: parent
	}
	if(_.indexOf(_.property('required')(schema), field.id) !== -1){ 
		opts.required = true
	}
	if(field['$ref']){
		if (field['$ref'][0] === '#'){
			opts.schema = _.property(field['$ref'].substring(1, field['$ref'].length))(schema)
		}
	}
	opts.floating_label = true
	opts.show_title = true
	opts.type = type  
	let _input = riot.mount(el, `schema-${tag_type}`, opts)[0]   
}

var loadSchema = function(parent, schema, el){    
	parent.schema = schema
	const props = schema.properties;  
	_.each(_.filter(_.sortBy(props, (prop) =>{ 
		return _.property(`render.options.fields.${prop.id}.order`)(schema) 
	}), (obj) => {
			return (obj !== '')
		}), function (field, key, obj) {   
		const field_type = _.property(`render.options.fields.${field.id}.type`)(schema) || field.type  
		if(field.$ref){
			createInputField(schema, parent, field, 'ref', 'text', el)
		}else if(field_type === 'string'){ 
			createInputField(schema, parent, field, 'text', 'text', el)
		}else if(field_type === 'textarea'){ 
			createInputField(schema, parent, field, 'textarea', 'textarea', el)
		}else{
			createInputField(schema, parent, field, 'text', field_type, el)
		}
	}); 
} 

export {createInputField, loadSchema}