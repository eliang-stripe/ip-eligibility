import React, { useState, useEffect } from 'react'
import connectedAccountsData from '../data/connected_accounts.json'

// Icons as inline SVG components
const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
    <path clipRule="evenodd" d="M3 16C1.61929 16 0.5 14.8807 0.5 13.5V5.54791C0.5 4.89162 0.821983 4.27709 1.36158 3.90352L6.48633 0.355616C6.82081 0.124056 7.21794 0 7.62475 0H8.37525C8.78206 0 9.17919 0.124056 9.51367 0.355615L14.6384 3.90352C15.178 4.27709 15.5 4.89162 15.5 5.54791V13.5C15.5 14.8807 14.3807 16 13 16H3ZM5 14.5H3C2.44772 14.5 2 14.0523 2 13.5V5.54791C2 5.38383 2.0805 5.2302 2.21539 5.13681L7.34015 1.5889C7.42377 1.53101 7.52305 1.5 7.62475 1.5H8.37525C8.47695 1.5 8.57623 1.53101 8.65985 1.5889L13.7846 5.13681C13.9195 5.2302 14 5.38383 14 5.54791V13.5C14 14.0523 13.5523 14.5 13 14.5H11V8C11 7.44772 10.5523 7 10 7H6C5.44772 7 5 7.44772 5 8V14.5ZM6.5 14.5H9.5V8.5H6.5V14.5Z" fill="currentColor" fillRule="evenodd"/>
  </svg>
)

const BalanceIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
    <path d="M1 2C1 1.58579 1.33579 1.25 1.75 1.25H9.25C9.66421 1.25 10 1.58579 10 2C10 2.41421 9.66421 2.75 9.25 2.75H1.75C1.33579 2.75 1 2.41421 1 2Z" fill="currentColor"/>
    <path d="M1 10C1 9.58579 1.33579 9.25 1.75 9.25H6.75C7.16421 9.25 7.5 9.58579 7.5 10C7.5 10.4142 7.16421 10.75 6.75 10.75H1.75C1.33579 10.75 1 10.4142 1 10Z" fill="currentColor"/>
    <path d="M3.25 5.25C2.83579 5.25 2.5 5.58579 2.5 6C2.5 6.41421 2.83579 6.75 3.25 6.75H10.75C11.1642 6.75 11.5 6.41421 11.5 6C11.5 5.58579 11.1642 5.25 10.75 5.25H3.25Z" fill="currentColor"/>
    <path d="M2.5 14C2.5 13.5858 2.83579 13.25 3.25 13.25H7.25C7.66421 13.25 8 13.5858 8 14C8 14.4142 7.66421 14.75 7.25 14.75H3.25C2.83579 14.75 2.5 14.4142 2.5 14Z" fill="currentColor"/>
    <path clipRule="evenodd" d="M16 11.5C16 13.433 14.433 15 12.5 15C10.567 15 9 13.433 9 11.5C9 9.567 10.567 8 12.5 8C14.433 8 16 9.567 16 11.5ZM14.5 11.5C14.5 12.6046 13.6046 13.5 12.5 13.5C11.3954 13.5 10.5 12.6046 10.5 11.5C10.5 10.3954 11.3954 9.5 12.5 9.5C13.6046 9.5 14.5 10.3954 14.5 11.5Z" fill="currentColor" fillRule="evenodd"/>
  </svg>
)

const TransactionsIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
    <path d="M9.71444 6.69296C9.43457 6.99832 9.45524 7.47275 9.76061 7.75261C10.066 8.03248 10.5404 8.01181 10.8203 7.70645L13.7526 4.50693C14.0154 4.22023 14.0154 3.78024 13.7527 3.49351L10.8203 0.293311C10.5405 -0.0120832 10.0661 -0.0328036 9.76066 0.247031C9.45527 0.526865 9.43455 1.00129 9.71439 1.30668L11.4953 3.25022L4.60027 3.24987C2.52913 3.24977 0.850081 4.92873 0.850081 6.99987V7.06665C0.850081 7.48086 1.18587 7.81665 1.60008 7.81665C2.01429 7.81665 2.35008 7.48086 2.35008 7.06665V6.99987C2.35008 5.75719 3.35751 4.74981 4.60019 4.74987L11.495 4.75022L9.71444 6.69296Z" fill="currentColor"/>
    <path d="M6.28586 9.30674C6.56569 9.00134 6.54497 8.52692 6.23958 8.24709C5.93419 7.96725 5.45976 7.98797 5.17993 8.29337L2.24757 11.4936C1.98485 11.7803 1.98486 12.2203 2.2476 12.507L5.17996 15.7068C5.45981 16.0121 5.93424 16.0328 6.23961 15.753C6.54499 15.4731 6.56568 14.9987 6.28583 14.6933L4.5054 12.7505H11.4C13.4711 12.7505 15.15 11.0716 15.15 9.00052V8.93359C15.15 8.51938 14.8142 8.18359 14.4 8.18359C13.9858 8.18359 13.65 8.51938 13.65 8.93359V9.00052C13.65 10.2432 12.6426 11.2505 11.4 11.2505H4.50476L6.28586 9.30674Z" fill="currentColor"/>
  </svg>
)

const DirectoryIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
    <path clipRule="evenodd" d="M2.5 14.4H13.5C13.7209 14.4 13.9 14.2209 13.9 14C13.9 12.1222 12.3778 10.6 10.5 10.6H5.5C3.62223 10.6 2.1 12.1222 2.1 14C2.1 14.2209 2.27909 14.4 2.5 14.4ZM2.5 16H13.5C14.6046 16 15.5 15.1046 15.5 14C15.5 11.2386 13.2614 9 10.5 9H5.5C2.73858 9 0.5 11.2386 0.5 14C0.5 15.1046 1.39543 16 2.5 16Z" fill="currentColor" fillRule="evenodd"/>
    <path clipRule="evenodd" d="M8 6.4C9.32548 6.4 10.4 5.32548 10.4 4C10.4 2.67452 9.32548 1.6 8 1.6C6.67452 1.6 5.6 2.67452 5.6 4C5.6 5.32548 6.67452 6.4 8 6.4ZM8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor" fillRule="evenodd"/>
  </svg>
)

const ProductIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
    <path clipRule="evenodd" d="M7.97311 0C7.66262 0 7.3564 0.0722903 7.07869 0.211146L1.60655 2.94721C0.928981 3.286 0.500977 3.97852 0.500977 4.73607V11.3054C0.500977 12.0412 0.904957 12.7175 1.55278 13.0664L6.33503 15.6414C6.77216 15.8768 7.26086 16 7.75733 16H8.24452C8.74105 16 9.22982 15.8768 9.66699 15.6413L14.4483 13.0664C15.096 12.7175 15.4999 12.0412 15.4999 11.3055V4.73599C15.4999 3.97848 15.072 3.28599 14.3945 2.94718L8.92331 0.211199C8.64557 0.0723089 8.33931 0 8.02878 0H7.97311ZM13.9999 11.3055V5.62105L8.7499 8.44799V14.4123C8.82049 14.387 8.88932 14.3564 8.95576 14.3207L13.737 11.7457C13.899 11.6585 13.9999 11.4894 13.9999 11.3055ZM8.25241 1.5528L13.5093 4.18162L11.4495 5.29075L6.06848 2.3933L7.74951 1.55279C7.81893 1.51807 7.89549 1.5 7.97311 1.5H8.02878C8.10641 1.5 8.18298 1.51808 8.25241 1.5528ZM4.75605 3.04951L2.49116 4.18196L7.9999 7.14821L10.1839 5.9722L4.75605 3.04951ZM7.2499 8.44799L2.00098 5.62165V11.3054C2.00098 11.4894 2.10197 11.6584 2.26393 11.7456L7.04618 14.3207C7.11195 14.3561 7.18006 14.3865 7.2499 14.4116V8.44799Z" fill="currentColor" fillRule="evenodd"/>
  </svg>
)

const SearchIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
    <path clipRule="evenodd" d="M7.88334 9.08539C7.06854 9.6615 6.0738 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 6.07379 9.66151 7.06852 9.08542 7.88331L11.7511 10.549C11.9187 10.7166 12.0017 10.9368 12 11.1564C11.9984 11.3718 11.9154 11.5867 11.7511 11.751C11.5847 11.9174 11.3665 12.0004 11.1485 12C10.9315 11.9996 10.7146 11.9166 10.549 11.751L7.88334 9.08539ZM8.3 5C8.3 6.82254 6.82254 8.3 5 8.3C3.17746 8.3 1.7 6.82254 1.7 5C1.7 3.17746 3.17746 1.7 5 1.7C6.82254 1.7 8.3 3.17746 8.3 5Z" fill="currentColor" fillRule="evenodd"/>
  </svg>
)

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 2.5H5C3.61929 2.5 2.5 3.61929 2.5 5V11C2.5 12.3807 3.61929 13.5 5 13.5H11C12.3807 13.5 13.5 12.3807 13.5 11V5C13.5 3.61929 12.3807 2.5 11 2.5ZM5 1C2.79086 1 1 2.79086 1 5V11C1 13.2091 2.79086 15 5 15H11C13.2091 15 15 13.2091 15 11V5C15 2.79086 13.2091 1 11 1H5Z" fill="#6C7688"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 8C6.25 7.58579 6.58579 7.25 7 7.25H8.25C8.66421 7.25 9 7.58579 9 8V11.5C9 11.9142 8.66421 12.25 8.25 12.25C7.83579 12.25 7.5 11.9142 7.5 11.5V8.75H7C6.58579 8.75 6.25 8.41421 6.25 8Z" fill="#6C7688"/>
<path d="M6.75 5C6.75 4.31075 7.31075 3.75 8 3.75C8.68925 3.75 9.25 4.31075 9.25 5C9.25 5.68925 8.68925 6.25 8 6.25C7.31075 6.25 6.75 5.68925 6.75 5Z" fill="#6C7688"/>
</svg>

)

const ChevronRightIcon = () => (
  <svg className="w-2 h-2" fill="none" viewBox="0 0 8 8">
    <path d="M2.005 0.505008C2.07 0.439999 2.14717 0.388431 2.23211 0.353248C2.31704 0.318066 2.40807 0.299957 2.5 0.299957C2.59193 0.299957 2.68296 0.318066 2.7679 0.353248C2.85283 0.388431 2.93 0.439999 2.995 0.505008L5.995 3.50501C6.06001 3.57001 6.11158 3.64718 6.14676 3.73211C6.18194 3.81705 6.20005 3.90808 6.20005 4.00001C6.20005 4.09194 6.18194 4.18297 6.14676 4.2679C6.11158 4.35284 6.06001 4.43001 5.995 4.49501L2.995 7.49501C2.86372 7.62629 2.68566 7.70004 2.5 7.70004C2.31434 7.70004 2.13628 7.62629 2.005 7.49501C1.87372 7.36373 1.79996 7.18567 1.79996 7.00001C1.79996 6.90808 1.81807 6.81705 1.85325 6.73212C1.88843 6.64718 1.94 6.57001 2.005 6.50501L4.51 4.00001L2.005 1.49501C1.93999 1.43001 1.88842 1.35284 1.85324 1.2679C1.81806 1.18297 1.79995 1.09194 1.79995 1.00001C1.79995 0.908076 1.81806 0.817045 1.85324 0.732113C1.88842 0.64718 1.93999 0.57001 2.005 0.505008V0.505008Z" fill="currentColor"/>
  </svg>
)

const Sidebar = () => (
  <div className="fixed left-0 top-0 w-[228px] bg-white border-r border-gray-200 flex flex-col h-screen z-10">
    {/* Account Section */}
    <div className="h-[60px] px-5 flex items-center border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-orange-400 rounded overflow-hidden flex items-center justify-center">
          <span className="text-white text-xs font-semibold">🌵</span>
        </div>
        <span className="font-semibold text-gray-800 text-sm">Cactus Practice</span>
      </div>
    </div>

    {/* Navigation */}
    <div className="flex-1 px-5 py-5 space-y-7">
      {/* Main Navigation */}
      <div className="space-y-1">
        <NavItem icon={<HomeIcon />} label="Home" />
        <NavItem icon={<BalanceIcon />} label="Balances" />
        <NavItem icon={<TransactionsIcon />} label="Transactions" />
        <NavItem icon={<DirectoryIcon />} label="Directory" />
        <NavItem icon={<ProductIcon />} label="Product catalog" />
      </div>

      {/* Shortcuts */}
      <div className="space-y-2">
        <SectionHeading label="Shortcuts" />
        <NavItem label="Fraud tools" />
        <NavItem label="Terminal" />
      </div>

      {/* Products */}
      <div className="space-y-2">
        <SectionHeading label="Products" />
        <div className="space-y-1">
          {[...Array(5)].map((_, i) => (
            <NavItem key={i} label="" />
          ))}
        </div>
      </div>
    </div>
  </div>
)

const NavItem = ({ icon, label }) => (
  <div className="flex items-center space-x-2 h-[30px] px-1 rounded-md hover:bg-gray-50 cursor-pointer">
    {icon && <div className="w-6 h-6 flex items-center justify-center text-gray-500">{icon}</div>}
    <span className="text-sm text-gray-700 flex-1">{label}</span>
  </div>
)

const SectionHeading = ({ label }) => (
  <div className="h-[26px] flex items-center">
    <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
  </div>
)

const Header = () => (
  <div className="h-[60px] bg-white border-gray-200 px-6 flex items-center justify-between fixed top-0 z-10 w-[calc(100%-228px)]">
    {/* Search */}
    <div className="flex-1 max-w-[500px]">
      <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 cursor-pointer">
        <SearchIcon />
        <span className="text-sm text-gray-500">Search</span>
      </div>
    </div>

    {/* Actions */}
    <div className="flex items-center space-x-6">
      <span className="text-sm font-semibold">Developers</span>
      <span className="text-sm font-semibold">Sandboxes</span>
      <div className="flex items-center space-x-4">
        <button className="w-4 h-4 text-gray-600 hover:text-gray-800 relative">
          <svg fill="none" viewBox="0 0 16 16">
            <path clipRule="evenodd" d="M5.0051 13H2.79025C1.75877 13 1.00092 12.153 1 11.2109C0.999762 10.9652 1.05102 10.713 1.16235 10.4677L1.63929 9.41667C2.21442 8.1493 2.55644 6.78835 2.64889 5.39928L2.6762 4.98893C2.86305 2.18151 5.19099 0 8 0C10.809 0 13.1369 2.18151 13.3238 4.98893L13.3511 5.39928C13.4436 6.78835 13.7856 8.1493 14.3607 9.41667L14.8376 10.4677C14.949 10.713 15.0002 10.9652 15 11.2109C14.9991 12.153 14.2412 13 13.2097 13H10.9952C10.9952 14.6569 9.65428 16 8.00015 16C6.34603 16 5.0051 14.6569 5.0051 13ZM2.52565 11.0884L3.00259 10.0374C3.65229 8.60567 4.03866 7.06825 4.1431 5.49905L4.17041 5.0887C4.30482 3.06923 5.97938 1.5 8 1.5C10.0206 1.5 11.6952 3.06923 11.8296 5.0887L11.8569 5.49905C11.9613 7.06825 12.3477 8.60567 12.9974 10.0374L13.4744 11.0884C13.5618 11.2811 13.4211 11.5 13.2097 11.5H2.79025C2.57886 11.5 2.43817 11.2811 2.52565 11.0884ZM6.50263 13C6.50263 13.8284 7.17309 14.5 8.00015 14.5C8.82721 14.5 9.49768 13.8284 9.49768 13H6.50263Z" fill="currentColor" fillRule="evenodd"/>
          </svg>
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></div>
        </button>
        <button className="w-4 h-4 text-gray-600 hover:text-gray-800"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M7.99996 10C9.10453 10 9.99996 9.10457 9.99996 8C9.99996 6.89543 9.10453 6 7.99996 6C6.89539 6 5.99996 6.89543 5.99996 8C5.99996 9.10457 6.89539 10 7.99996 10ZM7.99996 11.5C9.93295 11.5 11.5 9.933 11.5 8C11.5 6.067 9.93295 4.5 7.99996 4.5C6.06696 4.5 4.49996 6.067 4.49996 8C4.49996 9.933 6.06696 11.5 7.99996 11.5Z" fill="#474E5A"/>
<path fillRule="evenodd" clipRule="evenodd" d="M7.40917 14.5H8.59082L8.64285 13.6676C8.68604 12.9765 9.12642 12.4062 9.72215 12.1591C10.3207 11.9109 11.0352 12.0054 11.5529 12.4622L12.1784 13.014L13.0139 12.1785L12.4622 11.5531C12.0053 11.0354 11.9109 10.3208 12.1591 9.72222C12.4062 9.12646 12.9765 8.68604 13.6676 8.64285L14.5 8.59082V7.40918L13.6676 7.35715C12.9765 7.31396 12.4062 6.87355 12.1591 6.27781C11.9109 5.67926 12.0053 4.9647 12.4622 4.44695L13.0139 3.82163L12.1784 2.98608L11.553 3.53784C11.0353 3.99467 10.3207 4.0891 9.72218 3.84089C9.12644 3.59384 8.68604 3.02347 8.64285 2.33241L8.59082 1.5H7.40917L7.35715 2.33236C7.31396 3.02345 6.87354 3.59384 6.27778 3.8409C5.67921 4.08913 4.96463 3.99471 4.44686 3.53785L3.82153 2.98609L2.98598 3.82164L3.53784 4.44708C3.99465 4.9648 4.08908 5.67931 3.84088 6.27784C3.59384 6.87357 3.02348 7.31396 2.33245 7.35715L1.5 7.40917V8.59082L2.33241 8.64285C3.02346 8.68604 3.59383 9.12643 3.84089 9.72218C4.0891 10.3207 3.99467 11.0353 3.53784 11.553L2.98597 12.1785L3.82152 13.014L4.44696 12.4622C4.9647 12.0053 5.67925 11.9109 6.27781 12.1591C6.87356 12.4062 7.31396 12.9765 7.35715 13.6676L7.40917 14.5ZM4.51386 14.3779C4.57751 14.3386 4.63866 14.2934 4.69655 14.2424L5.4394 13.5869C5.51167 13.5231 5.61418 13.5078 5.70322 13.5447C5.79219 13.5816 5.85406 13.665 5.86007 13.7612L5.92186 14.7498C5.92668 14.8269 5.93797 14.902 5.95519 14.9748C5.96527 15.0175 5.9774 15.0593 5.99145 15.1002C6.17209 15.6264 6.67094 16 7.2526 16H8.7474C9.32903 16 9.82785 15.6264 10.0085 15.1003C10.0226 15.0594 10.0347 15.0175 10.0448 14.9749C10.062 14.9021 10.0733 14.8269 10.0781 14.7498L10.1399 13.7611C10.1459 13.665 10.2078 13.5816 10.2967 13.5447C10.3858 13.5078 10.4882 13.5232 10.5605 13.5869L11.3033 14.2424C11.3612 14.2935 11.4224 14.3387 11.4861 14.378C11.5234 14.401 11.5615 14.422 11.6004 14.441C12.1001 14.6852 12.717 14.5967 13.1283 14.1854L14.1853 13.1284C14.5966 12.7171 14.6851 12.1002 14.4408 11.6004C14.4218 11.5616 14.4009 11.5234 14.3779 11.4862C14.3385 11.4225 14.2934 11.3614 14.2423 11.3035L13.5869 10.5607C13.5231 10.4884 13.5077 10.3859 13.5447 10.2968C13.5816 10.2078 13.665 10.1459 13.7612 10.1399L14.7498 10.0781C14.8269 10.0733 14.902 10.062 14.9748 10.0448C15.0174 10.0347 15.0593 10.0226 15.1002 10.0086C15.6263 9.82795 16 9.32909 16 8.7474V7.2526C16 6.67093 15.6264 6.17209 15.1002 5.99144C15.0593 5.9774 15.0175 5.96527 14.9748 5.95519C14.902 5.93797 14.8269 5.92668 14.7498 5.92186L13.7612 5.86007C13.665 5.85406 13.5816 5.79219 13.5447 5.70321C13.5078 5.61417 13.5231 5.51166 13.5869 5.43938L14.2423 4.69666C14.2934 4.63873 14.3386 4.57754 14.3779 4.51384C14.4009 4.47658 14.4219 4.43846 14.4409 4.39963C14.6851 3.89987 14.5966 3.28297 14.1853 2.87168L13.1283 1.8147C12.717 1.40342 12.1001 1.31487 11.6004 1.55913C11.5615 1.57811 11.5234 1.5991 11.4861 1.6221C11.4224 1.66142 11.3613 1.70662 11.3033 1.75773L10.5606 2.41309C10.4883 2.47686 10.3858 2.49223 10.2968 2.4553C10.2078 2.41841 10.1459 2.33497 10.1399 2.23884L10.0781 1.25016C10.0733 1.17312 10.062 1.09795 10.0448 1.02516C10.0347 0.982504 10.0226 0.940667 10.0085 0.899751C9.8279 0.373623 9.32906 0 8.7474 0H7.2526C6.67091 0 6.17205 0.373663 5.99142 0.899834C5.97738 0.940737 5.96526 0.982562 5.95518 1.0252C5.93797 1.09798 5.92668 1.17314 5.92186 1.25016L5.86007 2.2388C5.85406 2.33495 5.79218 2.41842 5.70318 2.45532C5.61412 2.49225 5.51159 2.47688 5.43929 2.41309L4.69656 1.75774C4.63865 1.70665 4.57748 1.66146 4.51381 1.62215C4.47655 1.59915 4.43844 1.57817 4.39962 1.55919C3.89985 1.31487 3.2829 1.40341 2.87159 1.81472L1.81461 2.8717C1.40332 3.28298 1.31477 3.89987 1.55903 4.39963C1.57802 4.43848 1.59902 4.47662 1.62203 4.5139C1.66134 4.57758 1.70653 4.63876 1.75763 4.69667L2.41308 5.43951C2.47684 5.51177 2.4922 5.61425 2.45529 5.70326C2.4184 5.79221 2.33499 5.85406 2.23888 5.86007L1.25016 5.92186C1.17311 5.92668 1.09792 5.93797 1.02512 5.9552C0.982451 5.96529 0.940602 5.97742 0.899674 5.99147C0.373587 6.17215 0 6.67097 0 7.2526V8.7474C0 9.32905 0.373619 9.82789 0.899741 10.0085C0.940658 10.0226 0.982497 10.0347 1.02516 10.0448C1.09795 10.062 1.17312 10.0733 1.25016 10.0781L2.23884 10.1399C2.33497 10.1459 2.41841 10.2078 2.4553 10.2968C2.49222 10.3858 2.47686 10.4883 2.41309 10.5606L1.75762 11.3034C1.70654 11.3613 1.66137 11.4225 1.62207 11.4861C1.59906 11.5234 1.57806 11.5615 1.55907 11.6004C1.31475 12.1001 1.40328 12.7171 1.81459 13.1284L2.87157 14.1854C3.28289 14.5967 3.89985 14.6852 4.39963 14.4409C4.43846 14.4219 4.47659 14.4009 4.51386 14.3779Z" fill="#474E5A"/>
</svg>
</button>
        <button className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">
          +
        </button>
      </div>
    </div>
  </div>
)

const Toggle = ({ enabled, onChange, label, description }) => (
  <button onClick={onChange} className="flex items-start space-x-3 w-full text-left">
    <div className="flex-shrink-0 mt-0.5">
      <div className={`w-[34px] h-[18px] rounded-full relative transition-colors ${enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}>
        <div className={`absolute top-0 w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'} border ${enabled ? 'border-indigo-600' : 'border-gray-300'}`} />
      </div>
    </div>
    <div className="flex-1">
      <div className="font-semibold text-sm text-gray-800">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{description}</div>
    </div>
  </button>
)

const RadioGroup = ({ value, onChange, options }) => (
  <div className="space-y-2">
    {options.map((option) => (
      <button
        key={option.value}
        onClick={() => onChange(option.value)}
        className={`w-full p-3 rounded-md border-2 text-left transition-colors ${
          value === option.value
            ? 'border-indigo-600 bg-white'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className={`font-semibold text-sm ${value === option.value ? 'text-indigo-600' : 'text-gray-800'}`}>
          {option.label}
        </div>
        <div className="text-sm text-gray-500 mt-1">{option.description}</div>
      </button>
    ))}
  </div>
)

const Checkbox = ({ checked, onChange, label, showInput, inputValue, onInputChange, inputPlaceholder, prefix, suffix }) => (
  <div className="space-y-3">
    <button onClick={onChange} className="flex items-start space-x-2 text-left w-full">
      <div className="flex-shrink-0 mt-0.5">
        <div className={`w-3.5 h-3.5 rounded border ${checked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'} flex items-center justify-center`}>
          {checked && (
            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 8 8">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1.5 4L3 5.5L6.5 2"/>
            </svg>
          )}
        </div>
      </div>
      <span className="font-semibold text-sm text-gray-800">{label}</span>
    </button>

    {checked && showInput && (
      <div className="ml-5 flex items-center space-x-2">
        <div className="relative">
          {prefix && (
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{prefix}</span>
          )}
          <input
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={inputPlaceholder}
            className={`w-32 ${prefix ? 'pl-6' : 'pl-2'} pr-2 py-1 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-right`}
          />
        </div>
        {suffix && (
          <span className="text-sm text-gray-500">{suffix}</span>
        )}
      </div>
    )}
  </div>
)

// Accounts Modal Component
const AccountsModal = ({ isOpen, onClose, accounts, title, audienceType, criteria }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-semibold"
          >
            ×
          </button>
        </div>

        {/* Criteria Section */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="text-sm text-gray-700">
            {audienceType === 'selected' ? (
              <span className="font-medium text-gray-600">Showing manually selected accounts</span>
            ) : criteria && criteria.length > 0 ? (
              <>
                <span className="font-medium">Applied filters:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {criteria.map((criterion, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md"
                    >
                      {criterion}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <span className="font-medium text-orange-600">No filters applied (showing all accounts)</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[55vh]">
          <div className="space-y-3">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">{account.name}</div>
                  <div className="text-xs text-gray-500">ID: {account.id}</div>
                </div>
                <div className="flex space-x-4 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">{account.daysOnPlatform}</span> days
                  </div>
                  <div>
                    <span className="font-medium">${account.lifetimePayoutVolume.toLocaleString()}</span> volume
                  </div>
                  <div>
                    <span className="font-medium">{account.numberOfPayouts}</span> payouts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Total: <span className="font-medium">{accounts.length}</span> accounts
          </p>
        </div>
      </div>
    </div>
  )
}

function Prototype1() {
  const [noCodeControls, setNoCodeControls] = useState(true)
  const [audienceType, setAudienceType] = useState('eligible')
  const [accountAge, setAccountAge] = useState(false)
  const [payoutVolume, setPayoutVolume] = useState(false)
  const [payoutNumber, setPayoutNumber] = useState(false)
  const [dailyLimit, setDailyLimit] = useState('500.00')

  // Threshold values
  const [accountAgeThreshold, setAccountAgeThreshold] = useState('90')
  const [payoutVolumeThreshold, setPayoutVolumeThreshold] = useState('10,000.00')
  const [payoutNumberThreshold, setPayoutNumberThreshold] = useState('4')

  // Eligible accounts count
  const [eligibleAccountsCount, setEligibleAccountsCount] = useState(0)

  // Modal state
  const [showAccountsModal, setShowAccountsModal] = useState(false)

  // Helper function to parse number values from strings (handles commas)
  const parseNumber = (value) => {
    return parseFloat(value.toString().replace(/,/g, '')) || 0
  }

  // Helper function to format currency/number with commas
  const formatNumberWithCommas = (value) => {
    // Remove any non-digit, non-decimal characters
    const numericValue = value.replace(/[^\d.]/g, '')

    // Handle decimal places (max 2)
    const parts = numericValue.split('.')
    if (parts.length > 2) {
      return formatNumberWithCommas(parts[0] + '.' + parts[1])
    }
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2)
    }

    // Add commas to the integer part
    if (parts[0]) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return parts.join('.')
  }

  // Helper function to format integer input
  const formatInteger = (value) => {
    return value.replace(/[^\d]/g, '')
  }

  // Updated handlers for threshold inputs
  const handleAccountAgeChange = (value) => {
    const formatted = formatInteger(value)
    setAccountAgeThreshold(formatted)
  }

  const handlePayoutVolumeChange = (value) => {
    const formatted = formatNumberWithCommas(value)
    setPayoutVolumeThreshold(formatted)
  }

  const handlePayoutNumberChange = (value) => {
    const formatted = formatInteger(value)
    setPayoutNumberThreshold(formatted)
  }

  const handleDailyLimitChange = (value) => {
    const formatted = formatNumberWithCommas(value)
    setDailyLimit(formatted)
  }

  // Get filtered accounts based on criteria
  const getFilteredAccounts = () => {
    if (audienceType === 'selected') {
      return [] // Return empty array for selected accounts since none are manually selected yet
    }

    return connectedAccountsData.filter(account => {
      // Check account age criteria
      if (accountAge) {
        const thresholdDays = parseNumber(accountAgeThreshold)
        if (account.daysOnPlatform <= thresholdDays) {
          return false
        }
      }

      // Check payout volume criteria
      if (payoutVolume) {
        const thresholdVolume = parseNumber(payoutVolumeThreshold)
        if (account.lifetimePayoutVolume <= thresholdVolume) {
          return false
        }
      }

      // Check number of payouts criteria
      if (payoutNumber) {
        const thresholdNumber = parseNumber(payoutNumberThreshold)
        if (account.numberOfPayouts <= thresholdNumber) {
          return false
        }
      }

      return true
    })
  }

  // Filter accounts based on criteria (for count)
  const filterEligibleAccounts = () => {
    return getFilteredAccounts().length
  }

  // Get active criteria for display
  const getActiveCriteria = () => {
    const criteria = []

    if (accountAge) {
      criteria.push(`Account age > ${accountAgeThreshold} days`)
    }

    if (payoutVolume) {
      criteria.push(`Payout volume > $${payoutVolumeThreshold}`)
    }

    if (payoutNumber) {
      criteria.push(`Number of payouts > ${payoutNumberThreshold}`)
    }

    return criteria
  }

  // Update eligible accounts count when criteria change
  useEffect(() => {
    const count = filterEligibleAccounts()
    setEligibleAccountsCount(count)
  }, [
    audienceType,
    accountAge,
    accountAgeThreshold,
    payoutVolume,
    payoutVolumeThreshold,
    payoutNumber,
    payoutNumberThreshold
  ])

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-[228px] flex flex-col min-w-0 pb-20 pt-16">
        <Header />

        {/* FOOTER */}
        <div class="fixed ml-[228px] bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-5 z-10">
            <button className="py-2 px-3 bg-indigo-600 text-white text-sm rounded-lg font-medium text-gray-500">Review and apply changes</button>
        </div>

        <div className="flex-1 p-6 max-w-[972px]">
          {/* Content Header */}
          <div className="mb-6 space-y-2">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-indigo-600 font-semibold">Settings</span>
              <ChevronRightIcon />
              <span className="text-indigo-600 font-semibold">Connect</span>
              <ChevronRightIcon />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
            <p className="text-gray-600">Customize the payout experience for your connected accounts.</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-6">
              <button className="py-4 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">External accounts</button>
              <button className="py-4 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">Statement descriptor</button>
              <button className="py-4 px-2 border-b-2 border-indigo-600 text-sm font-semibold text-indigo-600">Instant payouts</button>
              <button className="py-4 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">Multi-currency settlement</button>
            </div>
          </div>

          <div className="space-y-10">
            {/* Info Banner */}
            <div className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3">
              <InfoIcon />
              <p className="text-sm text-gray-700">
                These settings apply to <span className="text-indigo-600">{connectedAccountsData.length}</span> connected accounts that you're liable for if they can't pay back negative balances.
              </p>
            </div>

            {/* No-code Controls Toggle */}
            <Toggle
              enabled={noCodeControls}
              onChange={() => setNoCodeControls(!noCodeControls)}
              label="No-code Instant Payout controls"
              description="[Once enabled, Instant Payouts eligibility will be determined by these dashboard settings]"
            />

            { noCodeControls && (
            <>
            {/* Audience Selection */}
            <div className="flex space-x-10">
              <div className="w-[300px] space-y-1">
                <h3 className="font-semibold text-sm text-gray-800">Instant Payouts audience</h3>
                <p className="text-sm text-gray-500">Select which connected accounts have access to Instant Payouts.</p>
              </div>
              <div className="w-[500px]">
                <RadioGroup
                  value={audienceType}
                  onChange={setAudienceType}
                  options={[
                    { value: 'eligible', label: 'Eligible accounts', description: 'Only accounts that match the criteria and thresholds you set will have access.' },
                    { value: 'selected', label: 'Selected accounts', description: 'Only accounts you select will have access.' }
                  ]}
                />
              </div>
            </div>

            {/* Eligible Accounts Settings */}
            <div className="flex space-x-10">
              <div className="w-[300px] space-y-1">
                <h3 className="font-semibold text-sm text-gray-800">Eligible accounts</h3>
                <p className="text-sm text-gray-500">
                  {audienceType === 'selected'
                    ? 'You can manually select which accounts have access to Instant Payouts.'
                    : 'These settings will limit Instant Payouts to only users who match the criteria you select at the thresholds you set.'
                  }
                </p>
              </div>
              <div className="w-[500px] space-y-6">
                {audienceType === 'eligible' && (
                  <div className="space-y-3">
                    <Checkbox
                      checked={accountAge}
                      onChange={() => setAccountAge(!accountAge)}
                      label="Account age"
                      showInput={true}
                      inputValue={accountAgeThreshold}
                      onInputChange={handleAccountAgeChange}
                      suffix="days or older"
                    />
                    <Checkbox
                      checked={payoutVolume}
                      onChange={() => setPayoutVolume(!payoutVolume)}
                      label="Total payout volume"
                      showInput={true}
                      inputValue={payoutVolumeThreshold}
                      onInputChange={handlePayoutVolumeChange}
                      prefix="$"
                      suffix="or greater"
                    />
                    <Checkbox
                      checked={payoutNumber}
                      onChange={() => setPayoutNumber(!payoutNumber)}
                      label="Number of lifetime payouts"
                      showInput={true}
                      inputValue={payoutNumberThreshold}
                      onInputChange={handlePayoutNumberChange}
                      suffix="payouts or more"
                    />
                  </div>
                )}
                <div className="space-y-2.5">
                  <p className="text-sm text-gray-700">
                    {audienceType === 'selected'
                      ? (
                        <>
                          <button
                            onClick={() => setShowAccountsModal(true)}
                            className="cursor-pointer font-[600]"
                          >
                            {eligibleAccountsCount} accounts
                          </button> are currently selected.
                        </>
                      )
                      : (
                        <>
                        {eligibleAccountsCount == 200 && "All "}
                        <button
                            onClick={() => setShowAccountsModal(true)}
                            className="cursor-pointer font-[600]">
                            {eligibleAccountsCount} accounts
                        </button> are eligible based on these rules. You can manually set eligibility for any account from their account details page.
                        </>
                      )
                    }
                  </p>
                  <button className="px-3 py-1.5 bg-gray-100 text-sm font-medium rounded-md hover:bg-gray-200">
                    Configure eligibility
                  </button>
                </div>
              </div>
            </div>

            {/* Daily Limit */}
            <div className="flex space-x-10">
              <div className="w-[300px] space-y-1">
                <h3 className="font-semibold text-sm text-gray-800">Daily limit per account</h3>
                <p className="text-sm text-gray-500">Connected accounts can use Instant Payouts to pay out up to this amount each day.</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-[146px]">
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={dailyLimit}
                      onChange={(e) => handleDailyLimitChange(e.target.value)}
                      className="w-full pl-6 pr-2 py-1 border border-gray-300 rounded-md text-sm text-gray-800"
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500">per account, per day</span>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Platform Daily Limit */}
            <div className="flex space-x-10">
              <div className="w-[300px] space-y-1">
                <h3 className="font-semibold text-sm text-gray-800">Platform daily limit</h3>
                <p className="text-sm text-gray-500">When you hit this limit across all your connected accounts, we will disable the feature and prevent additional Instant Payouts for that day.</p>
              </div>
              <div className="flex-1 space-y-5">
                <div className="w-[500px] space-y-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-700">
                    <span>$4233.22 used today</span>
                    <span>$10,000.00 limit</span>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-gray-100 text-sm font-medium rounded-md hover:bg-gray-200">
                  Request daily limit increase
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex space-x-10">
              <div className="w-[300px] space-y-1">
                <h3 className="font-semibold text-sm text-gray-800">Pricing</h3>
                <p className="text-sm text-gray-500">Control how much your users will be charged for Instant Payouts.</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  Customize a monetization strategy for Instant Payouts in <span className="text-indigo-600">Platform pricing</span>.
                </p>
              </div>
            </div>
            </>
            )}
          </div>
        </div>

      </div>

      {/* Accounts Modal */}
      <AccountsModal
        isOpen={showAccountsModal}
        onClose={() => setShowAccountsModal(false)}
        accounts={getFilteredAccounts()}
        title={audienceType === 'selected' ? 'Selected Accounts' : 'Eligible Accounts'}
        audienceType={audienceType}
        criteria={getActiveCriteria()}
      />
    </div>
  )
}

export default Prototype1