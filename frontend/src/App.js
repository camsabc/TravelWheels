import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import Promos from './pages/Promos'
import Inquiry from './pages/Inquiry';
import Homepage from './pages/Homepage';
import ServicesMain from './pages/ServicesMain';
import Profile from './pages/Profile';

import FlightsDetails from './components/FlightsDetails';
import HotelDetails from './components/HotelDetails';
import PassportDetails from './components/PassportDetails';
import VisaDetails from './components/VisaDetails';
import MiceDetails from './components/MiceDetails';
import CarDetails from './components/CarDetails';
import Educ1 from './components/Educ1';
/* Import statement for pages */
import Home from './pages/Home'
import UpcomingBooking from './pages/UpcomingBooking';
import DetailsBooking from './pages/DetailsBooking';
import Services from './pages/Services';
import DetailsRide from './pages/DetailsRide';
import Admin from './pages/Admin';
import Quotation from './pages/Quotation';
import DetailsQuotation from './pages/DetailsQuotation';
import SignUp from './pages/SignUp';
import DetailsOneEduc from './pages/DetailsOneEduc';
import DetailsBookingEduc from './pages/DetailsBookingEduc';
import DetailsQuotationEduc from './pages/DetailsQuotationEduc';

import Login3 from './pages/Login3';
import DetailsDomPack from './pages/DetailsDomPack';
import DetailsIntPack from './pages/DetailsIntPack';




import ServicesGuest from './pages/guestPages/ServicesGuest';
import ServicesRideGuest from './pages/guestPages/ServicesRideGuest';
import ServicesEducGuest from './pages/guestPages/ServicesEducGuest';
import ServicesPackGuest from './pages/guestPages/ServicesPackGuest';
import HomepageUser from './pages/HomepageUser';

import Otp from './pages/Otp';
import Forgot from './pages/Forgot';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/services" element={<ServicesMain/>}/>
              {/* <Route path="/Profile" element={<Profile/>}/> */}
              <Route path="/services-guest" element={<ServicesGuest/>}/>
              <Route path="/services-ride-guest" element={<ServicesRideGuest/>}/>
              <Route path="/services-educ-guest" element={<ServicesEducGuest/>}/>
              <Route path="/services-pack-guest" element={<ServicesPackGuest/>}/>

              <Route path="/promos" element={<Promos/>}/>
              <Route path="/inquiry" element={<Inquiry/>}/>

              <Route path="/flight" element={<FlightsDetails/>}/>
              <Route path="/hotel" element={<HotelDetails/>}/>
              <Route path="/passport" element={<PassportDetails/>}/>
              <Route path="/visa" element={<VisaDetails/>}/>
              <Route path="/mice" element={<MiceDetails/>}/>
              <Route path="/car" element={<CarDetails/>}/>


              <Route path="/login" element={<Login3/>}/>
              <Route path="/signup" element={<SignUp/>}/>

              <Route path="/profile" element={<Profile />} />
              <Route path="/upcoming-booking" element={<UpcomingBooking />} />
              <Route path="/quotation" element={<Quotation />} />
              <Route path="/details-booking" element={<DetailsBooking />} /> admin
              <Route path="/details-quotation" element={<DetailsQuotation />} /> admin
              <Route path="/services-portal" element={<Services />} />
              <Route path="/ride/:id" element={<DetailsRide />} />
              <Route path="/educ/:id" element={<DetailsOneEduc />} />
              <Route path="/educ-bookings/:id" element={<DetailsBookingEduc />} />
              <Route path="/educ-quotations/:id" element={<DetailsQuotationEduc />} />

              <Route path="/pack-dom/:id" element={<DetailsDomPack />} />
              <Route path="/pack-int/:id" element={<DetailsIntPack />} />

              <Route path="/admin" element={<Admin />} />


              <Route path="/home-user" element={<HomepageUser />} />

              <Route path="/otp" element={<Otp/>}/>
              <Route path="/forgot" element={<Forgot/>}/>


            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
