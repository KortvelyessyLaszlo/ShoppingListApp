import './Footer.less';

/**
 * Footer component for the Shopping List App.
 * 
 * This component renders the footer section of the application, 
 * including copyright information and links to Privacy Policy, 
 * Terms of Service, and Contact Us pages.
 * 
 * @returns {JSX.Element} The rendered footer component.
 */
export function Footer() {
  return (
    <div className="footer">
      <p>&copy; 2023 Shopping List App. All rights reserved.</p>
      <div className="links">
        <a href="">Privacy Policy</a>
        <a href="">Terms of Service</a>
        <a href="">Contact Us</a>
      </div>
    </div>
  );
}