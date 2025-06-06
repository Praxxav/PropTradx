import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-6">Last updated: June 06, 2025</p>

      <p className="mb-4">
        This Privacy Policy describes Our policies and procedures on the
        collection, use and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
      </p>

      <p className="mb-4">
        We use Your Personal data to provide and improve the Service. By using
        the Service, You agree to the collection and use of information in
        accordance with this Privacy Policy. This Privacy Policy has been
        created with the help of the{" "}
        <a
          href="https://www.freeprivacypolicy.com/free-privacy-policy-generator/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Free Privacy Policy Generator
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Interpretation and Definitions</h2>
      <h3 className="text-xl font-medium mt-4 mb-2">Interpretation</h3>
      <p className="mb-4">
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural.
      </p>

      <h3 className="text-xl font-medium mt-4 mb-2">Definitions</h3>
      <p className="mb-2">For the purposes of this Privacy Policy:</p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li><strong>Account:</strong> A unique account created for You to access our Service.</li>
        <li><strong>Affiliate:</strong> Entity under common control with a party.</li>
        <li><strong>Company:</strong> (referred to as "We", "Us" or "Our") refers to proptradx.</li>
        <li><strong>Cookies:</strong> Small files placed on Your device to track browsing history.</li>
        <li><strong>Country:</strong> Maharashtra, India</li>
        <li><strong>Device:</strong> Any device that can access the Service.</li>
        <li><strong>Personal Data:</strong> Information related to an identifiable individual.</li>
        <li><strong>Service:</strong> Refers to the Website.</li>
        <li><strong>Service Provider:</strong> Third-party who processes data on behalf of the Company.</li>
        <li><strong>Usage Data:</strong> Data collected automatically when using the Service.</li>
        <li><strong>Website:</strong>{" "}
          <a
            href="https://proptradx.netlify.app/"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://proptradx.netlify.app/
          </a>
        </li>
        <li><strong>You:</strong> The individual accessing the Service or the company they represent.</li>
      </ul>

      {/* SECTION: Collecting and Using Your Data */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Collecting and Using Your Personal Data</h2>
      <h3 className="text-xl font-medium mt-4 mb-2">Types of Data Collected</h3>
      <h4 className="text-lg font-medium mt-3">Personal Data</h4>
      <p className="mb-2">
        While using Our Service, We may ask You to provide Us with certain
        personally identifiable information:
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Email address</li>
        <li>First name and last name</li>
        <li>Phone number</li>
        <li>Address, State, Province, ZIP/Postal code, City</li>
        <li>Usage Data</li>
      </ul>

      <h4 className="text-lg font-medium mt-3">Usage Data</h4>
      <p className="mb-4">
        Usage Data is collected automatically when using the Service. This may
        include information like IP address, browser type, pages visited,
        duration, and device type.
      </p>

      <h4 className="text-lg font-medium mt-3">Tracking Technologies and Cookies</h4>
      <p className="mb-2">
        We use Cookies and similar tracking technologies such as beacons, tags,
        and scripts to improve and analyze our Service.
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li><strong>Session Cookies:</strong> Deleted after closing the browser.</li>
        <li><strong>Persistent Cookies:</strong> Remain even after you close your browser.</li>
        <li><strong>Web Beacons:</strong> Help count visitors and understand email effectiveness.</li>
      </ul>

      {/* You can continue adding the remaining sections similarly like: */}
      {/* - Use of Your Personal Data */}
      {/* - Sharing, Retention, Transfer, and Deletion of Data */}
      {/* - Security, Children’s Privacy, Links, Changes */}
      {/* - Contact Us */}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-2">
        If you have any questions about this Privacy Policy, You can contact us:
      </p>
      <ul className="list-disc list-inside mb-8">
        <li>
          By email:{" "}
          <a href="mailto:pranavkulkarni33917@gmail.com" className="text-blue-600 underline">
            pranavkulkarni33917@gmail.com
          </a>
        </li>
      </ul>
    </div>
  );
}
