import _ from 'lodash';
import riot from 'riot';


function Marshaler() {
	let self = this
	self.marshables = {
		number: function(val){
			return parseInt(val)
		},
		text: function(val){
			return val
		}
	}
	self.do = (type, val) => {
		if (self.marshables[type]){
			return self.marshables[type](val)
		}
		return val
	}
}
export default new Marshaler()