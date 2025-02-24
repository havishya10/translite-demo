"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
const navigation = [
  { name: "feature-1", href: "#" },
  { name: "feature-2", href: "#" },
  { name: "feature-3", href: "#" },
  { name: "feature-4", href: "#" },
];

// export function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   return (
//     <header className="absolute inset-x-0 top-0 z-50">
//       <nav
//         aria-label="Global"
//         className="flex items-center justify-between p-6 lg:px-8"
//       >
//         <div className="flex lg:flex-1">
//           <a href="#" className="-m-1.5 p-1.5">
//             <span className="sr-only">Your Company</span>
//             <img
//               alt=""
//               src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//               className="h-8 w-auto"
//             />
//           </a>
//         </div>
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-dark-700"
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon aria-hidden="true" className="size-6" />
//           </button>
//         </div>
//         <div className="hidden lg:flex lg:gap-x-12">
//           {navigation.map((item) => (
//             <a
//               key={item.name}
//               href={item.href}
//               className="text-sm/6 font-semibold text-white-900"
//             >
//               {item.name}
//             </a>
//           ))}
//         </div>
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <a href="#" className="text-sm/6 font-semibold text-violet-400">
//             Log in <span aria-hidden="true">&rarr;</span>
//           </a>
//         </div>
//       </nav>
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="lg:hidden"
//       >
//         <div className="fixed inset-0 z-50" />
//         <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//           <div className="flex items-center justify-between">
//             <a href="#" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt=""
//                 src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//                 className="h-8 w-auto"
//               />
//             </a>
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(false)}
//               className="-m-2.5 rounded-md p-2.5 text-white-700"
//             >
//               <span className="sr-only">Close menu</span>
//               <XMarkIcon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//               <div className="py-6">
//                 <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-violet-900 hover:bg-gray-50"
//                 >
//                   Log in
//                 </a>
//               </div>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// }

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className=" fixed bg-slate/30 backdrop-blur-md  shadow-md ">
      <nav
        aria-label="Global"
        className="flex items-center justify-between pt-5 pb-4 pr-6 pl-6 sm:px-8"
      >
        <div className="flex sm:flex-1">
          <a
            href="#"
            className="-m-1.5 p-1.5 text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
          >
            <span className="sr-only">Your Company</span>
            translite
          </a>
        </div>
        {/* Hamburger toggle only visible on screens <640 px */}
        <div className="flex  sm:hidden ">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-dark-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        {/* Navigation links visible on screens >=640 px */}
        <div className="hidden sm:flex sm:gap-x-12 ">
          <div className="sm:flex sm:gap-x-6 ">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-white-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="sm:flex sm:flex-1 ">
            <a href="#" className="text-sm/6 font-semibold text-violet-400">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </nav>
      {/* Mobile dialog and menu code remains unchanged */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="sm:hidden"
      >
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* Mobile menu content */}
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-900"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-violet-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
