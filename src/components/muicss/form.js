import riot from 'riot'; 
import {loadSchema, createInputField} from '../../utils/form';
import _ from 'lodash';

<schema-form> 
	<legend show={schema}>{opts.action} {schema.title}</legend>

	<script>

	let self = this; 
	self.data = {}; 
 
	self.clear = () =>{ 
		self.root.innerHTML = ''
	}

	self.getSchema = (id) =>{ 
		return self.parent.getSchema(id)
	}

	self.getSchemaData = (id) =>{
		return self.opts.parent.getSchemaData(id)
	}
	self.changeSchema = (schema) =>{
		self.opts.schema = schema
		loadSchema(self, schema)
	}

	self.on('mount', () =>{  
		if (self.opts.parent)
			self.parent = self.opts.parent 
		if(self.opts.schema){ 
			loadSchema(self, self.opts.schema)
		}
		self.update()
	})

	self.updateValue = (id, val) => {   
		if (val === '' || val === null)
			{   
				delete self.data[id]  
			}else{ 
				self.data[id] = val 
			} 

			console.log(`form:${self.opts.schema.id}_changed`, self.data)
			self.trigger(`form:${self.opts.schema.id}_changed`, self.data)
	}
	</script>
</schema-form> 