<h2 class="section-head">
  <span class="icon icon-back button button-back">Back</span>
  Information
</h2>
<div class="text">
  <h3 class="title"><%= title %></h3>
  <% _.each(text, function(para) { %>
    <%= para %>
  <% }); %>
</div>
