import riot from 'riot';
import _ from 'underscore';
<schema-form>

let self = this;
self.loadSchema = (schema) => { 
	const props = schema.properties;
	console.log(schema)
	// for (var key in props) {
	// 	console.log(key)
	// 	if (props.hasOwnProperty(key))
	// 		console.log(props[key]);
	// } 
	_.each(props, function (key, field) {
		let input = document.createElement('input')
		input.setAttribute('name', ""+key)
		self.root.appendChild(input)
	});
	self.update()

}
</schema-form> 