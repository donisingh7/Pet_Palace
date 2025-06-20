// client/src/components/Footer.jsx
import React from 'react';
import FollowUs from './FollowUs'
import styles from './Footer.module.css';
import {FaInstagram,FaFacebookF,FaTwitter,FaYoutube,FaLinkedinIn} from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FollowUs />
      <div className={styles.contentTop + ' ' + styles.pageWidth}>
        <div className={styles.blocksWrapper}>
          {/* ONLINE SHOPPING */}
          <div className={styles.footerBlock}>
            <h4 className={styles.heading}>ONLINE SHOPPING</h4>
            <ul className={styles.list}>
              <li><a href="/collections/dog-products" className={styles.link}>Dogs</a></li>
              <li><a href="/collections/cat-products" className={styles.link}>Cats</a></li>
              <li><a href="/collections/birds-small-animals-products" className={styles.link}>Grooming</a></li>
              <li><a href="/collections/personalised-dog-products" className={styles.link}>Pet Pharmacy</a></li>
              <li><a href="/pages/blogs" className={styles.link}>Pet Palace Blog</a></li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className={styles.footerBlock}>
            <h4 className={styles.heading}>QUICK LINKS</h4>
            <ul className={styles.list}>
              <li><a href="/pages/contact-us" className={styles.link}>My Account</a></li>
              <li><a href="/pages/faqs" className={styles.link}>Track Your Order</a></li>
              <li><a href="/pages/terms-of-use" className={styles.link}>Refund Policy</a></li>
              <li><a href="/pages/privacy-policy" className={styles.link}>Privacy Policy</a></li>
              <li><a href="/pages/return-policy" className={styles.link}>Return Policy</a></li>
              <li><a href="https://Pet Palace.sg/" className={styles.link}>Terms of Use</a></li>
              <li><a href="/pages/return-policy" className={styles.link}>Refer and Save</a></li>
            </ul>
          </div>

          {/* EXPLORE */}
          <div className={styles.footerBlock}>
            <h4 className={styles.heading}>EXPLORE</h4>
            <ul className={styles.list}>
              <li><a href="/pages/about-us" className={styles.link}>Our Story</a></li>
              <li><a href="/pages/careers" className={styles.link}>FAQ's</a></li>
              <li><a href="/pages/awards" className={styles.link}>Blogs</a></li>
              <li><a href="/pages/stores" className={styles.link}>Contact us</a></li>
            </ul>
          </div>

          {/* APP DOWNLOAD + NEWSLETTER */}
          <div className={styles.socialBlock}>
            <div className={styles.heading}>Download Pet Palace APP</div>
            <div className={styles.downloadFooter}>
              <a href="https://play.google.com/store/apps/details?id=com.Pet Palace.app" target="_blank" rel="noreferrer">
                 <img src="/play_store.png" alt="Google Play" />
              </a>
              <a href="https://apps.apple.com/in/app/heads-up-for-tails/id1643657088" target="_blank" rel="noreferrer">
                <img src="/app_store.png" alt="App Store" />
              </a>
            </div>

             <div className={styles.footerBlock} data-type="contact">
           <div className={styles.mobileSection}>

             {/* Social links */}
             <div className={styles.socialBlock}>
               <div className={styles.heading}>Follow us</div>
               <ul className={styles.socialList}>
                 <li><a href="https://instagram.com/yourpage" target="_blank" rel="noreferrer"><FaInstagram size={20} /></a></li>
                 <li><a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer"><FaFacebookF size={20} /></a></li>
                 <li><a href="https://youtube.com/yourpage"   target="_blank" rel="noreferrer"><FaYoutube size={20} /></a></li>
                 <li><a href="https://twitter.com/yourpage"  target="_blank" rel="noreferrer"> <FaTwitter size={20} /></a></li>
                 <li><a href="https://linkedin.com/yourpage" target="_blank" rel="noreferrer"><FaLinkedinIn size={20} /></a></li>

               </ul>
             </div>

             {/* Get in touch */}
             <div className={styles.contactBlock}>
               <div className={styles.heading}>Get in touch</div>
               <ul className={styles.contactList}>
                 <li>
                   <a href="tel:1800-123-456" className={styles.iconAndText}>
                     📞 1800-123-456
                   </a>
                 </li>
                 <li>
                   <a href="mailto:support@petpalace.com" className={styles.iconAndText}>
                     ✉️ support@petpalace.com
                   </a>
                 </li>
               </ul>
             </div>
           </div>
         </div>
          
          
         </div>
         
       </div>
       
      </div>
      {/* POPULAR SEARCHES */}
          <div className={styles.footerSection}>
            <div className={styles.footerBottomMainWrapper}>
              <div className={styles.pageWidth}>
                <div className={styles.bottomMenuWrapper}>
                  <div className={styles.footerTitle}>POPULAR SEARCHES</div>

                <ul className={styles.customBottomMenu}>
                  <li><a href="/collections/dog-food">Dog Food</a></li>
                  <li><a href="/collections/dog-collars-leashes-harnesses">Dog Collars Leashes Harnesses</a></li>
                  <li><a href="/collections/me-o">Me-O</a></li>
                  <li><a href="/collections/cat-clothes">Cat Clothes</a></li>
                  <li><a href="/collections/cat-litter">Cat Litter</a></li>
                  <li><a href="/collections/dog-raincoat">Dog Raincoat</a></li>
                  <li><a href="/collections/dog-toys">Dog Toys</a></li>
                  <li><a href="/collections/dog-beds">Dog Beds</a></li>
                  <li><a href="/collections/veg-dog-food">Veg Dog Food</a></li>
                  <li><a href="/collections/dog-biscuits-cookies">Dog Biscuits Cookies</a></li>
                  <li><a href="/collections/cat-dry-food">Cat Dry Food</a></li>
                  <li><a href="/collections/cat-food">Cat Food</a></li>
                  <li><a href="/collections/pet-pharmacy">Pet Pharmacy</a></li>
                  <li><a href="/collections/pedigree">Pedigree</a></li>
                  <li><a href="/collections/cat-toys">Cat Toys</a></li>
                  <li><a href="/collections/drools">Drools</a></li>
                  <li><a href="/collections/royal-canin">Royal Canin</a></li>
                  <li><a href="/collections/dog-grooming">Dog Grooming</a></li>
                  <li><a href="/collections/dog-carriers-travel-supplies">Dog Carrier</a></li>
                  <li><a href="/collections/dog-bones-chews">Dogs Bones Chews</a></li>
                  <li><a href="/collections/pedigree-pro">Pedigree Pro</a></li>
                  <li><a href="/collections/sheba">Sheba</a></li>
                  <li><a href="/collections/whiskas">Whiskas</a></li>
                  <li><a href="/collections/cat-collars-leashes-harnesses">Cat Collars Leashes Harnesses</a></li>
                  <li><a href="/collections/cat-wet-food">Cat Wet Food</a></li>
                  <li><a href="/collections/dog-shampoos-conditioners">Dog Shampoos &amp; Conditioners</a></li>
                  <li><a href="/collections/cat-carriers-travel-supplies">Cat Carriers Travel Supplies</a></li>
                  <li><a href="/collections/dog-accessories">Dog Accessories</a></li>
                  <li><a href="/collections/dog-bowls-feeders">Dog Bowls Feeders</a></li>
                  <li><a href="/collections/dog-clothes">Dog Clothes</a></li>
                  <li><a href="/collections/dog-treats">Dog Treats</a></li>
                  <li><a href="/collections/cat-accessories">Cat Accessories</a></li>
                  <li><a href="/collections/cat-litter-boxes-toilets">Cat Litter Boxes</a></li>
                  <li><a href="/collections/cat-treats">Cat Treats</a></li>
                  <li><a href="/collections/farmina">Farmina</a></li>
                  <li><a href="/collections/dog-leashes">Dog Leashes</a></li>
                  <li><a href="/collections/cat-kitten-food">Cat Kitten Food</a></li>
                  <li><a href="/collections/cat-beds-mats-tents">Cat Beds Mats Tents</a></li>
                  <li><a href="/collections/deworming-tablets">Deworming Tablets</a></li>
                  <li><a href="/collections/cat-shampoo-conditioners">Cat Shampoo &amp; Conditioners</a></li>
                  <li><a href="/collections/dog-fleas-ticks">Dog Fleas &amp; Ticks</a></li>
                  <li><a href="/collections/dog-boots">Dog Boots</a></li>
                  <li><a href="/collections/orijen">Orijen Dog Food</a></li>
                  <li><a href="/collections/acana">Acana Dog Food</a></li>
                  <li><a href="/collections/dog-training-behaviour">Dog Training &amp; Behaviour</a></li>
                  <li><a href="/collections/dog-food-supplements-and-vitamins">Dog Food Supplements &amp; Vitamins</a></li>
                  <li><a href="/collections/dog-sweaters">Dog Sweaters</a></li>
                  <li><a href="/collections/dog-jackets">Dog Jackets</a></li>
                  <li><a href="/collections/dog-blanket-cushion">Blanket &amp; cushions</a></li>
                  <li><a href="/collections/dog-shoes-boots-socks">Shoes, Boots &amp; Socks</a></li>
                  <li><a href="/collections/dog-sherwani">Sherwani</a></li>
                  <li><a href="/collections/dog-raincoat">Raincoats</a></li>
                  <li><a href="/collections/dog-skin-coat-care">Dog Skin &amp; Coat Care</a></li>
                  <li><a href="/collections/dog-skin-care">Skin Care</a></li>
                  <li><a href="/collections/dog-shampoos-conditioners">Shampoos &amp; Conditioners</a></li>
                  <li><a href="/collections/calcium-supplements-for-dogs-cats">Calcium Supplements</a></li>
                  <li><a href="/collections/joint-pain-medicine-for-dogs-cats">Join Pain Medication</a></li>
                  <li><a href="/collections/dog-gut-health-care">Gut Health Care</a></li>
                  <li><a href="/collections/dogs-bow-tie">Bow-ties</a></li>
                  <li><a href="/collections/dog-ethnic-wear">Ethnic wear</a></li>
                  <li><a href="/collections/cat-clothing">Cat Sweaters &amp; Hoodies</a></li>
                  <li><a href="/collections/cat-beds">Furry &amp; Plush Cat Beds</a></li>
                  <li><a href="/collections/cat-fleas-ticks">Fleas &amp; Ticks Care</a></li>
                  <li><a href="/collections/cat-joint-care">Cat Joint care Supplements</a></li>
                  <li><a href="/collections/cat-skin-care">Cat Skin Care Products</a></li>
                  <li><a href="/collections/pet-anxiety-care">Anxiety Care &amp; Comforting Products</a></li>
                  <li><a href="/collections/cat-interactive-toys">Interactive Cat Toys</a></li>
                  <li><a href="/collections/cat-catnips">Catnip Toys</a></li>
                  <li><a href="/collections/cat-litter">Clumping Cat Litter</a></li>
                  <li><a href="/collections/cat-cleaning-deodorizers">Deodorizers &amp; Litter Fresheners</a></li>
                  <li><a href="/collections/cat-litter-boxes-toilets">Litter Boxes &amp; Cat Toilets</a></li>
                  <li><a href="/collections/rabbit-products">Rabbit Products</a></li>
                  <li><a href="/collections/fish-food">Fish Food</a></li>
                  <li><a href="/collections/bird-food">Bird Food</a></li>
                </ul>


                  <div className={styles.footerBottomAddressWrapper}>
                    <div className={styles.footerBottomAddressHeading}>Pet Palace Head Office</div>
                    <div className={styles.footerBottomAddressPara}>
                      Somewhere, Surat, Gujrat 395007
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={[styles.pageWidth, styles.textCenter].join(' ')}>
             <div className={styles.footerBaseLinks}>
                © {new Date().getFullYear()} Pet Palace
              </div>
            </div>
          </div>
          
    </footer>
  );
}
