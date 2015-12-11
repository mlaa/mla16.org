<h2 class="text-head"><%= title %></h2>
<div class="text">
  <% _.each(text, function(para) { %>
    <%= para %>
  <% }); %>
</div>
