import riot from 'riot'; 
import {loadSchema, createInputField} from '../../utils/form';
import _ from 'lodash';

function reflectionSet(obj, prop, value) {
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
};
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
		// reflectionSet(self.data, id, v)  
		if (val === '' || val === null)
			{   
				delete self.data[id]  
			}else{ 
				self.data[id] = val 
			} 
	}
	</script>
</schema-form> 