import riot from 'riot';
import _ from 'underscore'; 
import {loadSchema} from '../../utils/form';

<schema-ref> 
	<style scoped>
		.mui-form-group > form.required ~ label:after {
		  content: ' *';
		}
		form{
			background: #F5F5F5;
		}
	</style>
	<div class="mui-form-group"> 
	<form class="{required: opts.required}" style="padding:20px" name="content" onsubmit={submit}></form>  
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
				self.opts.schema = schema.schema
				loadSchema(self, schema.schema, self.content)
				self.update() 
			})
			.catch((err) =>{
				console.log(err)
			})
		}catch(err){
			console.log(err.stack)
		} 
	}else{
		loadSchema(self, self.opts.schema, self.content)
		self.update() 
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
			if (val === '' || val === null)
			{   
				delete self.data[id]
				if (_.isEmpty(self.data)){
					self.opts.parent.updateValue(self.opts.field.id, null)
				}else{ 
					self.opts.parent.updateValue(self.opts.field.id, self.data)
				}
				// self.opts.parent.updateValue(`${self.opts.field.id}.${id}`, null)
			}else{ 
				self.data[id] = val
				self.opts.parent.updateValue(self.opts.field.id, self.data)
				// self.opts.parent.updateValue(`${self.opts.field.id}.${id}`, val)
			} 
		}
	// , 300)
</schema-ref>