<h2 class="section-head">
  <span class="icon icon-back button button-back">Back</span>
  <%= header %>
</h2>
<div class="text">
  <h4 class="cal"><%= cal %></h4>
  <h3><%= title %></h3>
  <div class="actions">
    <% if (saved) { %>
    <span class="icon icon-star button button-save active">Saved</span>
    <% } else { %>
    <span class="icon icon-star button button-save">Save</span>
    <% } %>
    <a class="icon icon-twitter button button-tweet" href="<%= tweetLink %>" target="_blank">#<%= hashtag %></a>
    <a class="icon icon-facebook button button-share" href="<%= shareLink %>" target="_blank">Share</a>
  </div>
  <% _.each(text, function(para) { %>
    <p><%= para %></p>
  <% }); %>
</div>
