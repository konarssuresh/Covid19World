import React from 'react';
import {NavLink,withRouter} from 'react-router-dom';

const footer=props=>(
    <footer class="page-footer font-small bg-dark text-white-50 pt-4">
  <div class="container-fluid text-center text-md-left">
    <div class="row">
      <div class="col-md-6 mt-md-0 mt-3">
        <h5 class="text-uppercase">DECLARATION</h5>
        <p class="text-justify">The counts has been taken as per the  website of https://github.com/konarssuresh/Covid19World/tree/master and 
          is  updated time to time as the data is updated in the site.</p>
      </div>
      <hr class="clearfix w-100 d-md-none pb-3"/>
      <div class="col-md-3 mb-md-0 mb-3">
        <h5 class="text-uppercase">Links</h5>
        <ul class="list-unstyled">
          <li>
            <NavLink to="/dashboard" >Dashboard</NavLink >
          </li>
          <li>
            <NavLink to="/stats" >Country Stats</NavLink >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright text-center py-3">© 2020:
    <a href="https://github.com/konarssuresh/Covid19World"> Covid19World</a>
  </div>
</footer>
)


export default footer;