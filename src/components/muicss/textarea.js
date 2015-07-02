import riot from 'riot';
import _ from 'underscore';

<schema-textarea> 
	<div class="mui-form-group">
	<textarea required={opts.required} placeholder={placeholder()} onchange={updateValue} onkeyup={updateValue} onpaste={updateValue} name="input" type="textarea" value="{opts.value}" class="mui-form-control"></textarea>
	<label if={!opts.field.description || opts.show_title} class="{mui-form-floating-label: opts.floating_label}" for="{opts.field.name}">{opts.field.description}</label>
	</div>

	let self = this 
	let ref = null 
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
			self.opts.parent.updateValue(self.opts.field.id, self.input.value)
		}
	}, 10)
</schema-textarea>