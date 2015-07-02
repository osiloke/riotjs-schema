import riot from 'riot';
import {headers} from '../../utils/table';

<schema-table>
	<style scoped>
	.nodata{
  	margin: 60px auto;
  	margin-top: 80px;
  	font-size: 1.2em;
		font-family: 'Roboto'
	}
	.actions {
		color: 
	  border-radius: 50%;
	  text-align: center;
	  cursor: pointer;
	  width: 31px;
	  height: 31px;
	  line-height: 31px;
	  display: inline-block;
	}
	</style>
	<table class="mui-table">
	  <thead show={opts.data.length > 0}>
	    <tr>
	      <th each={th}>{title}</th> 
	      <th></th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr each={opts.data}>
	      <td each={parent.th}>{this[id]}</td> 
	      <td class="mui-text-right mui-text-align-middle" style="padding-right: 75px">
		      <div class="mui-dropdown">
	          <a data-mui-toggle="dropdown" class="actions">
	          <i class="zmdi zmdi-more-vert"></i></a>
	          <ul class="mui-dropdown-menu mui-dropdown-menu-right">
	            <li><a onclick={parent.delete(this)}>Delete</a></li> 
	          </ul>
	        </div>
        </td>
	    </tr> 
	  </tbody>
	</table>
	<p show={opts.data.length < 1} class="nodata mui-text-center mui-align-middle">
		<i class="zmdi zmdi-cloud-off" style="margin-right: 10px"></i>No data <a href="">Refresh</a>
	</p>
	
	let self = this
	console.log(self) 
	self.th = null 
	self.on('update', (ev) => {  
		if (self.opts.schema) {
			self.th = headers(self.opts.schema) 
		}  
	})
	self.delete = (row) =>{
		console.log(row)
	}
	// self.on('mount', (ev) => console.log('mounted schema table'))
	self.on('unmount', (ev) => console.log('unmounted schema table'))
</schema-table>