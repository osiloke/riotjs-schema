Riot Schema

Minimal json schema form renderer for riot.
Currently uses muicss for styling and material design.

Simple usage

```
//Currently you can only use muicss components
//You can also bundle this up using gulp, systemjs, etc
import 'riot-schema/components/muicss/form';
import 'riot-schema/components/muicss/text';
import 'riot-schema/components/muicss/textarea';
import 'riot-schema/components/muicss/reference';
import 'muicss/mui';
import 'muicss/mui/css/mui.css!';
import riot from 'riot';

<A-Form>
<div name="form" action="Create"/>

<script>

let schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "hello",
  "type": "object",
  "title": "Hello Text",
  "description": "This is just a hello form",
  "name": "/",
  "properties": {
    "hello": {
      "id": "hello",
      "type": "string",
      "title": "Hello",
      "description": "Enter a name",
      "name": "hello"
    }
  },
  "required": [
    "hello"
  ]
}

riot.mount(self.form, "schema-form", {parent: self, schema: schema})
</script>
</A-Form>
```