import riot from 'riot';
import _ from 'lodash';
import m from '../../utils/marshaler';

<schema-text> 
	<div class="mui-form-group">
	<input required={opts.required} placeholder={placeholder()} onchange={updateValue} onkeyup={updateValue} onpaste={updateValue} name="input" type="{opts.type}" value="{opts.value}" class="mui-form-control">
	<label if={!opts.field.description || opts.show_title} class="{mui-form-floating-label: opts.floating_label}" for="{opts.field.id}">{opts.field.description}</label>
	</div>

	let self = this    
	if (_.contains(['latitude', 'longitude'], self.opts.type)){
		self.input.setAttribute('step', 'any')
		self.update()
	}
	self.placeholder = () => {
		if (!self.opts.floating_label){
			return self.opts.field.description
		}
		return 
	}

	self.updateValue = 
	_.debounce((ev) => { 
		if (self.input.value === '')
		{ 
			self.opts.parent.updateValue(self.opts.field.id, null)
		}else{ 
			self.opts.parent.updateValue(self.opts.field.id, m.do(self.opts.type, self.input.value))
		} 
	}, 10)
</schema-text>