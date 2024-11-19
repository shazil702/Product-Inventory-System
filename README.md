<h1>Product Management API</h1>

<p>This project is a <strong>Django REST Framework</strong>-based API combined with a <strong>React</strong> frontend to manage products, variants, subvariants, and stock. The frontend communicates with the backend using <strong>Axios</strong> for seamless API integration.</p>

<hr>

<h2>Features</h2>

<h3>Backend Features</h3>
<ul>
  <li><strong>Product Management:</strong>
    <ul>
      <li>Create, read, update, and delete products.</li>
      <li>Handle product attributes like name, code, image, HSN Code, and total stock.</li>
    </ul>
  </li>
  <li><strong>Variant and Subvariant Management:</strong>
    <ul>
      <li>Create variants and their subvariants for a product.</li>
      <li>Automatically handle relationships between products, variants, and subvariants.</li>
    </ul>
  </li>
  <li><strong>Stock Management:</strong>
    <ul>
      <li>Manage stock for subvariants.</li>
      <li>Support for both single and bulk stock addition.</li>
    </ul>
  </li>
  <li><strong>User Authentication:</strong>
    <ul>
      <li>Authenticate API requests using tokens (supports Django's authentication system).</li>
    </ul>
  </li>
</ul>

<h3>Frontend Features</h3>
<ul>
  <li><strong>React Components:</strong> Modularized and reusable components for product listing, detail views, and forms.</li>
  <li><strong>Axios Integration:</strong> Handles API requests to the backend with ease, including error handling and token-based authentication support.</li>
  <li><strong>Responsive Design:</strong> Frontend designed to be mobile and desktop-friendly.</li>
</ul>

<hr>

<h2>Technologies Used</h2>

<h3>Backend</h3>
<ul>
  <li><strong>Framework:</strong> Django, Django REST Framework</li>
  <li><strong>Database:</strong> PostgreSQL</li>
  <li><strong>Authentication:</strong> Token-based authentication</li>
  <li><strong>Image Management:</strong> VersatileImageField</li>
  <li><strong>Serialization:</strong> DRF serializers for nested relationships</li>
</ul>

<h3>Frontend</h3>
<ul>
  <li><strong>Framework:</strong> React</li>
  <li><strong>API Requests:</strong> Axios</li>
  <li><strong>State Management:</strong> React useState and Context API</li>
  <li><strong>Styling:</strong> CSS Modules / Styled Components (optional)</li>
</ul>

<hr>

<h2>Installation and Setup</h2>

<h3>Prerequisites</h3>
<p>Ensure you have the following installed:</p>
<ul>
  <li><strong>Backend:</strong> Python (3.8+ recommended), PostgreSQL, pipenv or virtualenv (optional)</li>
  <li><strong>Frontend:</strong> Node.js (16+ recommended), npm or yarn</li>
</ul>

<hr>

<h3>Backend Setup</h3>
<ol>
  <li><strong>Clone the repository:</strong>
    <pre><code>git clone https://github.com/your-username/product-management-api.git
cd product-management-api</code></pre>
  </li>
  <li><strong>Create a virtual environment:</strong>
    <pre><code>python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows</code></pre>
  </li>
  <li><strong>Install dependencies:</strong>
    <pre><code>pip install -r requirements.txt</code></pre>
  </li>
  <li><strong>Set up the database:</strong>
    <ul>
      <li>Create a PostgreSQL database.</li>
      <li>Update <code>DATABASES</code> in <code>settings.py</code> to match your database credentials.</li>
    </ul>
  </li>
  <li><strong>Run migrations:</strong>
    <pre><code>python manage.py migrate</code></pre>
  </li>
  <li><strong>Create a superuser:</strong>
    <pre><code>python manage.py createsuperuser</code></pre>
  </li>
  <li><strong>Run the development server:</strong>
    <pre><code>python manage.py runserver</code></pre>
  </li>
</ol>

<hr>

<h3>Frontend Setup</h3>
<ol>
  <li><strong>Navigate to the <code>frontend</code> directory:</strong>
    <pre><code>cd frontend</code></pre>
  </li>
  <li><strong>Install dependencies:</strong>
    <pre><code>npm install</code></pre>
  </li>
  <li><strong>Configure Axios:</strong>
    <ul>
      <li>Update the <code>baseURL</code> in the Axios configuration file (e.g., <code>src/api/axios.js</code>) to match your backend's URL.</li>
    </ul>
  </li>
  <li><strong>Run the React development server:</strong>
    <pre><code>npm start</code></pre>
  </li>
  <li><strong>Access the React app:</strong>
    <p>Visit <a href="http://localhost:3000/">http://localhost:3000/</a> in your browser.</p>
  </li>
</ol>

<hr>

<h2>API Endpoints</h2>

<h3>Product Endpoints</h3>
<ul>
  <li><strong>GET /products/:</strong> List all products.</li>
  <li><strong>POST /products/:</strong> Create a new product.</li>
  <li><strong>GET /products/{id}/:</strong> Retrieve a specific product.</li>
  <li><strong>PUT /products/{id}/:</strong> Update a product.</li>
  <li><strong>DELETE /products/{id}/:</strong> Delete a product.</li>
</ul>

<hr>

<h3>Example Payload for Product Creation</h3>
<pre><code>{
  "ProductID": 12345,
  "ProductCode": "P12345",
  "ProductName": "Sample Product",
  "ProductImage": "image.jpg",
  "variants": [
    {
      "name": "Variant 1",
      "subvariants": [
        {
          "name": "Subvariant 1",
          "stock": 10
        }
      ]
    }
  ]
}</code></pre>

<hr>

<h2>License</h2>
<p>This project is licensed under the MIT License.</p>
