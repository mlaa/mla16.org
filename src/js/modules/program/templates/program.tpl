<% if (type === 'category') { %>
<h2 class="section-head">
  <span class="icon icon-filter button button-filter">Filters</span>
  <%= title %>
</h2>
<% } else if (type === 'saved') { %>
<h2 class="section-head icon icon-star"><%= title %></h2>
<% } else if (type === 'search') { %>
<h2 class="section-head icon icon-search"><%= title %></h2>
<form id="search" action="#" class="text">
  <fieldset>
    <input id="terms" type="search" placeholder="Participant or session keyword" value="<%= decodeURIComponent(terms).replace(/\+/g, ' ') %>">
    <input type="submit" class="submit" value="Search">
  </fieldset>
</form>
<% } %>
<ul class="list"></ul>
