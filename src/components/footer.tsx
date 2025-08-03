"use client"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Bikin Acara</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="#">Create Events</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Plan Events</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="#">Sell Tickets Online</a>
            </li>
            <li>
              <a href="#">Performing Arts Ticketing Software</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Find Events</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="#">Jakarta Food & Drink Events</a>
            </li>
            <li>
              <a href="#">Bandung Holiday Events</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Connect With Us</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="#">Contact Support</a>
            </li>
            <li>
              <a href="#">Contact Sales</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
