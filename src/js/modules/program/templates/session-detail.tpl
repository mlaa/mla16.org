<h2 class="text-head"><%= header %></h2>
<div class="text">
  <h3><%= title %></h3>
  <h4><%= cal %></h4>
  <% _.each(text, function(para) { %>
    <p><%= para %></p>
  <% }); %>
  <% if (room) { %>
    <h4><%= venue %></h4>
    <div class="panzoom-parent">
      <img class="panzoom" src="/img/maps/vcc/<%= room %>.png" width="100%">
    </div>
  <% }; %>
</div>
