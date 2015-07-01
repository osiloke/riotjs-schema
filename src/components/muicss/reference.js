import riot from 'riot';
import _ from 'underscore'; 
import {loadSchema} from '../../utils/form';


<schema-ref> 
	<div class="mui-form-group"> 
	<form class="mui-z1" style="padding:20px" name="content" onsubmit={submit}></form> 
	<label if={!opts.field.description || opts.show_title} for="{opts.field.id}">{opts.field.description}</label>
	</div>

	let self = this 
	self.data = {}  
	self.getSchema = self.opts.parent.getSchema
	self.getSchemaData = self.opts.parent.getSchemadata

	self.submit = (ev) => {
		ev.preventDefault()
	}
	if (!self.opts.schema){ 
		try{ 	 
			self.opts.parent.getSchema(self.opts.field.$ref)
			.then((schema) =>{
				self.opts.schema = schema 
				loadSchema(self, schema.schema, self.content)
				self.update()
				// riot.mount(self.ref_form, "schema-ref-form", {parent: self, schema: schema.schema}) 
			})
			.catch((err) =>{
				console.log(err)
			})
		}catch(err){
			console.log(err.stack)
		} 
	}
	self.placeholder = () => {
		if (!self.opts.floating_label){
			return self.opts.field.description
		}
		return 
	}
	self.updateValue = 
	// _.debounce(
		(id, val) => { 
			if (val === '')
			{ 
				self.opts.parent.updateValue(`${self.opts.field.id}.${id}`, null)
			}else{ 
				self.opts.parent.updateValue(`${self.opts.field.id}.${id}`, val)
			} 
		}
	// , 300)
</schema-ref>