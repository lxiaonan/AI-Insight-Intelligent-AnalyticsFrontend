// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
// This file is generated by Umi automatically
      // DO NOT CHANGE IT MANUALLY!
      import { useEffect, useState } from 'react';
      import { SwaggerUIBundle } from 'swagger-ui-dist';
      import 'swagger-ui-dist/swagger-ui.css';
      const App = () => {
        const [value, setValue] = useState("xnbi" );
        useEffect(() => {
          SwaggerUIBundle({
            url: `/umi-plugins_${value}.json`,
            dom_id: '#swagger-ui',
          });
        }, [value]);

        return (
          <div
            style={{
              padding: 24,
            }}
          >
            <select
              style={{
                position: "fixed",
                right: "16px",
                top: "8px",
              }}
              onChange={(e) => setValue(e.target.value)}
            >
              <option value="xnbi">xnbi</option>
<option value="swagger">swagger</option>
            </select>
            <div id="swagger-ui" />
          </div>
        );
      };
      export default App;
