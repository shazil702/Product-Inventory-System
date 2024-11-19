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
  <li><strong>State Management:</strong> React useState</li>
  <li><strong>Styling:</strong> Tailwind Css(optional)</li>
</ul>

<hr>

