import React, { useState, useEffect } from "react";
import connectedAccountsData from "../data/connected_accounts.json";
import cactusImg from "./assets/cactus.png";
import { Button } from "./components";
import {
  HomeIcon,
  BalanceIcon,
  TransactionsIcon,
  DirectoryIcon,
  ProductIcon,
  SearchIcon,
  InfoIcon,
  InfoIcon12,
  ChevronRightIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
  NotificationIcon,
  SettingsIcon,
  ConnectIcon,
  BillingIcon,
  ReportingIcon,
  MoreIcon,
  USFlag,
  UKFlag,
  ESFlag,
  CAFlag,
  FRFlag,
  AlertIcon12,
} from "./icons";

// Common components used by both flows
const Tooltip = ({ children, text, disabled }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Don't show tooltip if text is empty or disabled is true
  const shouldShowTooltip = text && text.trim() !== "" && !disabled;

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => shouldShowTooltip && setIsVisible(true)}
        onMouseLeave={() => shouldShowTooltip && setIsVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {shouldShowTooltip && (
        <div
          className={`${
            isVisible ? "opacity-100" : "opacity-0"
          } transition transition-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 text-sm text-gray bg-white rounded-md z-50 shadow-lg max-w-[300px] w-max`}
        >
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

const Sidebar = () => (
  <div className="left-0 top-0 w-[228px] bg-white border-r border-gray-200 flex flex-col h-screen z-10 shrink-0">
    {/* Account Section */}
    <div className="h-[60px] px-5 flex items-center border-gray-200">
      <div className="flex items-center space-x-2">
        <img src={cactusImg} alt="Cactus" className="w-6 h-6 rounded-sm" />
        <span className="font-semibold text-gray-800 text-sm">
          Cactus Practice
        </span>
      </div>
    </div>

    {/* Navigation */}
    <div className="flex-1 px-5 py-5 space-y-7">
      {/* Main Navigation */}
      <div className="">
        <NavItem icon={<HomeIcon />} label="Home" />
        <NavItem icon={<BalanceIcon />} label="Balances" />
        <NavItem icon={<TransactionsIcon />} label="Transactions" />
        <NavItem icon={<DirectoryIcon />} label="Directory" />
        <NavItem icon={<ProductIcon />} label="Product catalog" />
      </div>

      {/* Products */}
      <div className="space-y-2">
        <SectionHeading label="Products" />
        <div className="">
          <NavItem icon={<ConnectIcon />} label="Connect" />
          <NavItem icon={<BillingIcon />} label="Billing" />
          <NavItem icon={<ReportingIcon />} label="Reporting" />
        </div>
      </div>
    </div>
  </div>
);

const NavItem = ({ icon, label }) => (
  <div className="flex items-center space-x-2 h-[30px] px-1 rounded-md hover:bg-gray-50 cursor-pointer">
    {icon && (
      <div className="w-6 h-6 flex items-center justify-center text-gray-500">
        {icon}
      </div>
    )}
    <span className="text-sm text-gray-700 flex-1">{label}</span>
  </div>
);

const SectionHeading = ({ label }) => (
  <div className="h-[26px] flex items-center">
    <span className="text-xs text-gray-500 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const Header = () => (
  <div className="h-[60px] bg-white border-gray-200 px-6 flex items-center justify-between fixed top-0 z-10 max-w-[1280px] w-[calc(100%-228px)]">
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
          <NotificationIcon />
        </button>
        <button className="w-4 h-4 text-gray-600 hover:text-gray-800">
          <SettingsIcon />
        </button>
        <button className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">
          +
        </button>
      </div>
    </div>
  </div>
);

// Onboarding Flow Components
const OnboardingHeader = ({ title, description, onEnableClick }) => (
  <div className="bg-gray-50 rounded-lg p-12 mb-8">
    <div className="max-w-[431px]">
      <div className="flex items-center space-x-4 mb-6"></div>
      <h1 className="text-[32px] font-bold text-gray-900 leading-[40px] mb-3">
        {title}
      </h1>
      <p className="text-lg text-gray-600 leading-[28px] mb-6">{description}</p>
      <div className="flex items-center space-x-3">
        <Button variant="primary" size="lg" onClick={onEnableClick}>
          Enable no-code controls
        </Button>
        <Button variant="secondary" size="lg">
          View docs
        </Button>
      </div>
    </div>
  </div>
);

// Enable Modal Component
const EnableModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-[640px] w-full mx-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-10 pt-8">
          <h2 className="text-[24px] font-bold text-gray-900">
            No-code Instant Payouts
          </h2>
          <p className="text-[16px] text-gray-600 mt-2">
            Customize instant payout eligibility with these dashboard controls.
          </p>
        </div>

        {/* Content */}
        <div className="px-10 py-8">
          <div className="space-y-6">
            <p className="text-[16px] text-gray-700 leading-[24px] tracking-[-0.31px]">
              When enabled, you'll be able to:
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-gray-900 leading-[24px] tracking-[-0.31px]">
                    Set eligibility criteria
                  </h4>
                  <p className="text-[14px] text-gray-600 leading-[20px] tracking-[-0.15px] mt-1">
                    Define which accounts are eligible based on account age,
                    payout volume, and activity history
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-gray-900 leading-[24px] tracking-[-0.31px]">
                    Configure daily limits
                  </h4>
                  <p className="text-[14px] text-gray-600 leading-[20px] tracking-[-0.15px] mt-1">
                    Set per-account and platform-wide daily limits to manage
                    risk and volume
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-gray-900 leading-[24px] tracking-[-0.31px]">
                    Manage pricing
                  </h4>
                  <p className="text-[14px] text-gray-600 leading-[20px] tracking-[-0.15px] mt-1">
                    Control fees charged to connected accounts for instant
                    payout transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose} size="lg">
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} size="lg">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

const OnboardingStep1 = () => {
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pricingConfigured, setPricingConfigured] = useState(false);
  const [existingApiIntegration, setExistingApiIntegration] = useState(false);

  const handleEnableClick = () => {
    setShowEnableModal(true);
  };

  const handleConfirmEnable = () => {
    setShowEnableModal(false);
    setShowSettings(true);
  };

  // If settings should be shown, render the SettingsPage
  if (showSettings) {
    return (
      <SettingsPage
        pricingConfigured={pricingConfigured}
        setPricingConfigured={setPricingConfigured}
        existingApiIntegration={existingApiIntegration}
        setExistingApiIntegration={setExistingApiIntegration}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-row">
      <Sidebar />

      <div className="w-full h-screen flex flex-col min-w-0 relative pb-20 pt-16 overflow-scroll">
        <div className="max-w-[1280px] w-full flex flex-col relative mx-auto">
          <Header />

          <div className="flex-1 p-6">
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
              <p className="text-gray-600">
                Customize the payout experience for your connected accounts.
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-6">
                <button className="py-3 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">
                  External accounts
                </button>
                <button className="py-3 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">
                  Statement descriptor
                </button>
                <button className="py-3 px-2 border-b-2 border-indigo-600 text-sm font-semibold text-indigo-600">
                  Instant payouts
                </button>
                <button className="py-3 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">
                  Multi-currency settlement
                </button>
              </div>
            </div>

            {/* Hero Section - First Step of Onboarding */}
            <OnboardingHeader
              title="No-code Instant Payouts"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla commodo libero vel sagittis. Pellentesque eros justo, vulputate in nulla ac, mattis volutpat nisl."
              onEnableClick={handleEnableClick}
            />
          </div>
        </div>
      </div>

      {/* Enable Modal */}
      <EnableModal
        isOpen={showEnableModal}
        onClose={() => setShowEnableModal(false)}
        onConfirm={handleConfirmEnable}
      />
    </div>
  );
};

// Settings Page Component (preserved Prototype2 functionality)
// ... existing code ...

const Toggle = ({ enabled, onChange, label, description }) => (
  <button
    onClick={onChange}
    className="flex items-start space-x-3 w-full text-left"
  >
    <div className="flex-shrink-0 mt-0.5">
      <div
        className={`w-[34px] h-[18px] rounded-full relative transition-colors ${
          enabled ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0 w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0"
          } border ${enabled ? "border-indigo-600" : "border-gray-300"}`}
        />
      </div>
    </div>
    <div className="flex-1">
      <div className="font-semibold text-sm text-gray-800">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{description}</div>
    </div>
  </button>
);

const ControlPanelToggle = ({ checked, onChange, label }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-sm text-gray-700">{label}</span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`w-10 h-6 rounded-full relative transition-colors duration-200 cursor-pointer ${
        checked ? "bg-indigo-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  </div>
);

// New Radio Button Component for audience selection
const RadioOption = ({
  value,
  selectedValue,
  onChange,
  label,
  description,
}) => (
  <button
    onClick={() => onChange(value)}
    className="flex items-start space-x-2.5 w-full text-left cursor-pointer"
  >
    <div className="flex-shrink-0 mt-0.5">
      <div
        className={`w-4 h-4 rounded-full border-1 border-gray-300 flex items-center justify-center ${
          selectedValue === value ? "bg-indigo-600 border-none" : "bg-white"
        }`}
      >
        {selectedValue === value && (
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        )}
      </div>
    </div>
    <div className="flex-1">
      <div className="font-medium text-sm text-gray-800">{label}</div>
      <div className="text-xs text-gray-500 mt-0.5">{description}</div>
    </div>
  </button>
);

const Checkbox = ({
  checked,
  onChange,
  label,
  showInput,
  inputValue,
  onInputChange,
  inputPlaceholder,
  prefix,
  suffix,
}) => (
  <div className="space-y-3">
    <button
      onClick={onChange}
      className="flex items-start space-x-2 text-left w-full cursor-pointer"
    >
      <div className="flex-shrink-0 mt-0.5">
        <div
          className={`w-3.5 h-3.5 rounded border ${
            checked
              ? "bg-indigo-600 border-indigo-600"
              : "border-gray-300 bg-white"
          } flex items-center justify-center`}
        >
          {checked && (
            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 8 8">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1.5 4L3 5.5L6.5 2"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="font-medium text-sm text-gray-800">{label}</span>
    </button>

    {checked && showInput && (
      <div className="ml-5 flex items-center space-x-2">
        <div className="relative">
          {prefix && (
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              {prefix}
            </span>
          )}
          <input
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={inputPlaceholder}
            className={`w-32 ${
              prefix ? "pl-6" : "pl-2"
            } pr-2 py-1 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-right`}
          />
        </div>
        {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
      </div>
    )}
  </div>
);

const CountryCheckbox = ({
  checked,
  onChange,
  label,
  countryCode,
  disabled,
}) => {
  const getFlagIcon = (code) => {
    switch (code) {
      case "us":
        return <USFlag />;
      case "uk":
        return <UKFlag />;
      case "es":
        return <ESFlag />;
      case "ca":
        return <CAFlag />;
      case "fr":
        return <FRFlag />;
      default:
        return <span className="text-xs text-gray-500">🏳️</span>;
    }
  };

  const checkboxElement = (
    <div className="flex-shrink-0">
      <div
        className={`w-3.5 h-3.5 rounded border ${
          checked
            ? "bg-indigo-600 border-indigo-600"
            : "border-gray-300 bg-white"
        } flex items-center justify-center ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => !disabled && onChange(!checked)}
      >
        {checked && (
          <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 8 8">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1.5 4L3 5.5L6.5 2"
            />
          </svg>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex items-center space-x-2 text-left w-full">
      {disabled ? (
        <Tooltip text="At least one country must be selected.">
          {checkboxElement}
        </Tooltip>
      ) : (
        checkboxElement
      )}
      <div
        className={`w-4 h-4 rounded flex items-center justify-center overflow-hidden ${
          !disabled ? "cursor-pointer" : ""
        }`}
        onClick={() => !disabled && onChange(!checked)}
      >
        {getFlagIcon(countryCode)}
      </div>
      <span
        className={`font-medium text-sm text-gray-800 ${
          !disabled ? "cursor-pointer" : ""
        }`}
        onClick={() => !disabled && onChange(!checked)}
      >
        {label}
      </span>
    </div>
  );
};

// Accounts Modal Component
const AccountsModal = ({
  isOpen,
  onClose,
  accounts,
  title,
  audienceType,
  criteria,
}) => {
  if (!isOpen) return null;

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
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-semibold"
          >
            ×
          </Button>
        </div>

        {/* Criteria Section */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="text-sm text-gray-700">
            {audienceType === "selected" ? (
              <span className="font-medium text-gray-600">
                Showing manually selected accounts
              </span>
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
              <span className="font-medium text-orange-600">
                No filters applied (showing all accounts)
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[55vh]">
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">
                    {account.name}
                  </div>
                  <div className="text-xs text-gray-500">ID: {account.id}</div>
                </div>
                <div className="flex space-x-6 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">
                      {account.daysOnPlatform}
                    </span>{" "}
                    days
                  </div>
                  <div>
                    <span className="font-medium">
                      ${account.lifetimePayoutVolume.toLocaleString()}
                    </span>{" "}
                    volume
                  </div>
                  <div>
                    <span className="font-medium">
                      {account.numberOfPayouts}
                    </span>{" "}
                    payouts
                  </div>
                  <div className="flex items-center gap-2">
                    {(() => {
                      switch (account.country) {
                        case "us":
                          return <USFlag />;
                        case "uk":
                          return <UKFlag />;
                        case "es":
                          return <ESFlag />;
                        case "ca":
                          return <CAFlag />;
                        case "fr":
                          return <FRFlag />;
                        default:
                          return (
                            <span className="text-xs text-gray-500">🏳️</span>
                          );
                      }
                    })()}
                    <span className="font-medium uppercase">
                      {account.country}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Total: <span className="font-medium">{accounts.length}</span>{" "}
            accounts
          </p>
        </div>
      </div>
    </div>
  );
};

// Eligibility Info Modal Component
const EligibilityInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            How does Stripe determine eligibility?
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-semibold"
          >
            ×
          </Button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Instant Payouts eligibility is determined by, but not limited to,
              certain criteria like:
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckIcon />
                <h4 className="font-medium text-gray-900">Account age</h4>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon />
                <h4 className="font-medium text-gray-900">
                  Payout volume and activity
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon />
                <h4 className="font-medium text-gray-900">Dispute rate</h4>
              </div>
            </div>
            <p className="text-gray-600">
              Eligibility is evaluated continuously and may change based on
              account activity and performance. You can always{" "}
              <span className="text-indigo-700 cursor-pointer">
                manually override eligibility
              </span>{" "}
              for any account from their account details page.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-4">
          <div className="flex justify-end">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// API Integration Modal Component
const ApiIntegrationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-[640px] w-full p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4">
          <h2 className="font-bold text-gray-900">
            Your API integration may need updates
          </h2>
        </div>

        {/* Content */}
        <div className="">
          <div className="space-y-6">
            <p className="text-sm">
              We’ve noticed that you’ve made Instant Payout API calls in the
              past. Enabling no-code dashboard controls may impact your existing
              API integration.
            </p>
            <p className="text-sm">
              Learn more and read our{" "}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600"
              >
                migration guide
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Back
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

// Settings Page Component - Preserved Prototype2 functionality
const SettingsPage = ({
  pricingConfigured,
  setPricingConfigured,
  existingApiIntegration,
  setExistingApiIntegration,
}) => {
  const [noCodeControls, setNoCodeControls] = useState(true);
  const [audienceType, setAudienceType] = useState("criteria"); // 'criteria' or 'selected'
  const [accountAge, setAccountAge] = useState(false);
  const [payoutVolume, setPayoutVolume] = useState(false);
  const [payoutNumber, setPayoutNumber] = useState(false);
  const [dailyLimit, setDailyLimit] = useState("500.00");

  // Control panel state
  const [multicurrency, setMulticurrency] = useState(false);
  const [controlPanelExpanded, setControlPanelExpanded] = useState(false);

  // Country filtering state
  const [selectedCountries, setSelectedCountries] = useState({
    us: true,
    uk: false,
    ca: true,
    es: false,
    fr: false,
  });

  // Threshold values
  const [accountAgeThreshold, setAccountAgeThreshold] = useState("90");
  const [payoutVolumeThreshold, setPayoutVolumeThreshold] =
    useState("10,000.00");
  const [payoutNumberThreshold, setPayoutNumberThreshold] = useState("4");

  // Eligible accounts count
  const [eligibleAccountsCount, setEligibleAccountsCount] = useState(0);

  // Modal state
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showEligibilityInfoModal, setShowEligibilityInfoModal] =
    useState(false);
  const [showApiIntegrationModal, setShowApiIntegrationModal] = useState(false);

  // Helper function to parse number values from strings (handles commas)
  const parseNumber = (value) => {
    return parseFloat(value.toString().replace(/,/g, "")) || 0;
  };

  // Helper function to format currency/number with commas
  const formatNumberWithCommas = (value) => {
    // Remove any non-digit, non-decimal characters
    const numericValue = value.replace(/[^\d.]/g, "");

    // Handle decimal places (max 2)
    const parts = numericValue.split(".");
    if (parts.length > 2) {
      return formatNumberWithCommas(parts[0] + "." + parts[1]);
    }
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
    }

    // Add commas to the integer part
    if (parts[0]) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return parts.join(".");
  };

  // Helper function to format integer input
  const formatInteger = (value) => {
    return value.replace(/[^\d]/g, "");
  };

  // Updated handlers for threshold inputs
  const handleAccountAgeChange = (value) => {
    const formatted = formatInteger(value);
    setAccountAgeThreshold(formatted);
  };

  const handlePayoutVolumeChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setPayoutVolumeThreshold(formatted);
  };

  const handlePayoutNumberChange = (value) => {
    const formatted = formatInteger(value);
    setPayoutNumberThreshold(formatted);
  };

  const handleDailyLimitChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setDailyLimit(formatted);
  };

  // Get filtered accounts based on criteria
  const getFilteredAccounts = () => {
    if (audienceType === "selected") {
      return []; // Return empty array for selected accounts since none are manually selected yet
    }

    return connectedAccountsData.filter((account) => {
      // Check account age criteria
      if (accountAge) {
        const thresholdDays = parseNumber(accountAgeThreshold);
        if (account.daysOnPlatform <= thresholdDays) {
          return false;
        }
      }

      // Check payout volume criteria
      if (payoutVolume) {
        const thresholdVolume = parseNumber(payoutVolumeThreshold);
        if (account.lifetimePayoutVolume <= thresholdVolume) {
          return false;
        }
      }

      // Check number of payouts criteria
      if (payoutNumber) {
        const thresholdNumber = parseNumber(payoutNumberThreshold);
        if (account.numberOfPayouts <= thresholdNumber) {
          return false;
        }
      }

      // Check country criteria (only if multicurrency is enabled)
      if (multicurrency) {
        const hasSelectedCountry = selectedCountries[account.country];
        if (!hasSelectedCountry) {
          return false;
        }
      }

      return true;
    });
  };

  // Filter accounts based on criteria (for count)
  const filterEligibleAccounts = () => {
    return getFilteredAccounts().length;
  };

  // Get active criteria for display
  const getActiveCriteria = () => {
    const criteria = [];

    if (accountAge) {
      criteria.push(`Account age > ${accountAgeThreshold} days`);
    }

    if (payoutVolume) {
      criteria.push(`Total payout volume > $${payoutVolumeThreshold}`);
    }

    if (payoutNumber) {
      criteria.push(`Number of lifetime payouts > ${payoutNumberThreshold}`);
    }

    if (multicurrency) {
      const selectedCountryNames = [];
      const countryNameMap = {
        us: "United States",
        uk: "United Kingdom",
        ca: "Canada",
        es: "Spain",
        fr: "France",
      };

      Object.keys(selectedCountries).forEach((code) => {
        if (selectedCountries[code]) {
          selectedCountryNames.push(countryNameMap[code]);
        }
      });

      if (selectedCountryNames.length > 0) {
        criteria.push(`Countries: ${selectedCountryNames.join(", ")}`);
      }
    }

    return criteria;
  };

  const Footer = () => (
    <div className="fixed bottom-0 right-0 bg-white border-t border-gray-200 py-3 z-10 w-[calc(100%-228px)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <Tooltip
          text={
            !pricingConfigured
              ? "You must set up pricing before enabling Instant Payouts."
              : ""
          }
          disabled={pricingConfigured}
        >
          <Button
            variant="primary"
            onClick={() => {
              if (existingApiIntegration) {
                setShowApiIntegrationModal(true);
              }
            }}
            disabled={!pricingConfigured}
          >
            Review and apply changes
          </Button>
        </Tooltip>
      </div>
    </div>
  );

  // Update eligible accounts count when criteria change
  useEffect(() => {
    const count = filterEligibleAccounts();
    setEligibleAccountsCount(count);
  }, [
    audienceType,
    accountAge,
    accountAgeThreshold,
    payoutVolume,
    payoutVolumeThreshold,
    payoutNumber,
    payoutNumberThreshold,
    multicurrency,
    selectedCountries,
  ]);

  return (
    <div className="min-h-screen bg-white flex flex-row">
      <Sidebar />

      <div className="w-full h-screen flex flex-col min-w-0 relative pb-20 pt-16 overflow-scroll ">
        <div className="max-w-[1280px] w-full flex flex-col relative mx-auto">
          <Header />
          <Footer />

          <div className="flex-1 p-6">
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
              <p className="text-gray-600">
                Customize the payout experience for your connected accounts.
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-6">
                <button className="py-3 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">
                  External accounts
                </button>
                <button className="py-3 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">
                  Statement descriptor
                </button>
                <button className="py-3 px-2 border-b-2 border-indigo-600 text-sm font-semibold text-indigo-600">
                  Instant payouts
                </button>
                <button className="py-3 px-2 border-b-2 border-transparent text-sm font-semibold text-gray-500">
                  Multi-currency settlement
                </button>
              </div>
            </div>

            <div className="space-y-10">
              {/* Info Banner */}
              <div className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3">
                <InfoIcon />
                <p className="text-sm text-gray-700">
                  These settings apply to{" "}
                  <span className="text-indigo-600">
                    {connectedAccountsData.length} connected accounts
                  </span>{" "}
                  that you're liable for if they can't pay back negative
                  balances.
                </p>
              </div>

              {/* No-code Controls Toggle */}
              <Toggle
                enabled={noCodeControls}
                onChange={() => setNoCodeControls(!noCodeControls)}
                label="No-code Instant Payout controls"
                description="When enabled, Instant Payouts eligibility will be determined by these dashboard settings"
              />

              {noCodeControls && (
                <>
                  {/* Instant Payouts Audience - Radio Button Design */}
                  <div className="flex space-x-15">
                    <div className="basis-1/3 shrink-0 max-w-[300px] space-y-1">
                      <h3 className="font-semibold text-sm text-gray-800">
                        Instant Payouts eligibility
                      </h3>
                      <p className="text-sm text-gray-500">
                        Select which accounts are eligible for Instant Payouts.
                      </p>
                      <p className="text-sm text-gray-500 mt-4">
                        For more information on risk, please consult Instant
                        Payouts{" "}
                        <a className="text-indigo-600 cursor-pointer hover:text-indigo-800">
                          documentation
                        </a>{" "}
                        and{" "}
                        <a className="text-indigo-600 cursor-pointer hover:text-indigo-800">
                          best practices
                        </a>
                        for managing fraud and risk.
                      </p>
                    </div>
                    <div className="max-w-[650px] space-y-4">
                      <RadioOption
                        value="recommended"
                        selectedValue={audienceType}
                        onChange={setAudienceType}
                        label="Stripe recommended"
                        description="Stripe determines which accounts are eligible."
                      />
                      {/* Stripe recommended disclosure - only show when Stripe recommended is selected */}
                      {audienceType === "recommended" && (
                        <div className="ml-6.5 text-sm text-gray-700 p-4 bg-gray-50 rounded-md flex flex-col gap-2">
                          <p>
                            <span className="font-[600]">123 accounts</span> are
                            eligible based on Stripe's model. You can manually
                            override eligibility for any account from their
                            account details page.
                          </p>
                          <Button
                            variant="link"
                            onClick={() => setShowEligibilityInfoModal(true)}
                            className="text-indigo-700 cursor-pointer hover:text-indigo-800 text-left"
                          >
                            How does Stripe determine eligibility?
                          </Button>
                        </div>
                      )}

                      <RadioOption
                        value="criteria"
                        selectedValue={audienceType}
                        onChange={setAudienceType}
                        label="Set my own criteria"
                        description="Accounts that match all of the criteria you set will be eligible."
                      />

                      {/* Criteria Options - only show when criteria is selected */}
                      {audienceType === "criteria" && (
                        <div className="ml-7 space-y-3">
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
                            suffix="or more payouts"
                          />

                          {multicurrency &&
                            (() => {
                              const selectedCountryCount =
                                Object.values(selectedCountries).filter(
                                  Boolean
                                ).length;
                              const isOnlyOneSelected =
                                selectedCountryCount === 1;

                              return (
                                <div className="space-y-2 mt-5">
                                  <div className="font-medium text-sm text-gray-800">
                                    Country
                                  </div>
                                  <div className="grid grid-cols-3 gap-x-2 gap-y-2">
                                    <CountryCheckbox
                                      checked={selectedCountries.us}
                                      onChange={(checked) => {
                                        setSelectedCountries({
                                          ...selectedCountries,
                                          us: checked,
                                        });
                                      }}
                                      label="United States"
                                      countryCode="us"
                                      disabled={
                                        isOnlyOneSelected &&
                                        selectedCountries.us
                                      }
                                    />
                                    <CountryCheckbox
                                      checked={selectedCountries.ca}
                                      onChange={(checked) => {
                                        setSelectedCountries({
                                          ...selectedCountries,
                                          ca: checked,
                                        });
                                      }}
                                      label="Canada"
                                      countryCode="ca"
                                      disabled={
                                        isOnlyOneSelected &&
                                        selectedCountries.ca
                                      }
                                    />
                                    <CountryCheckbox
                                      checked={selectedCountries.uk}
                                      onChange={(checked) => {
                                        setSelectedCountries({
                                          ...selectedCountries,
                                          uk: checked,
                                        });
                                      }}
                                      label="United Kingdom"
                                      countryCode="uk"
                                      disabled={
                                        isOnlyOneSelected &&
                                        selectedCountries.uk
                                      }
                                    />
                                    <CountryCheckbox
                                      checked={selectedCountries.es}
                                      onChange={(checked) => {
                                        setSelectedCountries({
                                          ...selectedCountries,
                                          es: checked,
                                        });
                                      }}
                                      label="Spain"
                                      countryCode="es"
                                      disabled={
                                        isOnlyOneSelected &&
                                        selectedCountries.es
                                      }
                                    />
                                    <CountryCheckbox
                                      checked={selectedCountries.fr}
                                      onChange={(checked) => {
                                        setSelectedCountries({
                                          ...selectedCountries,
                                          fr: checked,
                                        });
                                      }}
                                      label="France"
                                      countryCode="fr"
                                      disabled={
                                        isOnlyOneSelected &&
                                        selectedCountries.fr
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            })()}
                        </div>
                      )}

                      {audienceType === "criteria" && (
                        <div className="ml-7 text-sm text-gray-700 p-4 bg-gray-50 rounded-md">
                          {eligibleAccountsCount == 200 && "All "}
                          <button
                            onClick={() => setShowAccountsModal(true)}
                            className="cursor-pointer font-[600]"
                          >
                            {eligibleAccountsCount} accounts
                          </button>{" "}
                          are eligible based on these rules. You can manually
                          set eligibility for any account from their account
                          details page.
                        </div>
                      )}

                      <RadioOption
                        value="selected"
                        selectedValue={audienceType}
                        onChange={setAudienceType}
                        label="Choose specific accounts"
                        description="Only accounts you choose will be eligible."
                      />

                      {audienceType === "selected" && (
                        <div className="ml-7 text-sm text-gray-700">
                          You can manually set eligibility for any account from
                          their account details page.{" "}
                          <span className="text-indigo-600 cursor-pointer hover:text-indigo-800">
                            Learn more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-200" />

                  {/* Pricing */}
                  <div className="flex space-x-15">
                    <div className="basis-1/3 shrink-0 max-w-[300px] space-y-1">
                      <h3 className="font-semibold text-sm text-gray-800">
                        Pricing
                      </h3>
                      <p className="text-sm text-gray-500">
                        Control how much your users will be charged for Instant
                        Payouts.
                      </p>
                    </div>
                    <div className="flex-1 space-y-3">
                      {!pricingConfigured && (
                        <div className="flex items-center space-x-2">
                          <AlertIcon12 />
                          <p className="text-sm text-orange-800">
                            You must set up pricing before enabling Instant
                            Payouts.
                          </p>
                        </div>
                      )}
                      <p className="text-sm text-gray-700">
                        Customize a monetization strategy for Instant Payouts in{" "}
                        <span className="text-indigo-600 cursor-pointer hover:text-indigo-800">
                          Platform pricing
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-200" />

                  {/* Daily Limit */}
                  <div className="flex space-x-15">
                    <div className="basis-1/3 shrink-0 max-w-[300px] space-y-1">
                      <h3 className="font-semibold text-sm text-gray-800">
                        Daily limit per account
                      </h3>
                      <p className="text-sm text-gray-500">
                        Connected accounts can use Instant Payouts to pay out up
                        to this amount each day.
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-[146px]">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            $
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={dailyLimit}
                            onChange={(e) =>
                              handleDailyLimitChange(e.target.value)
                            }
                            className="w-full pl-6 pr-2 py-1 border border-gray-300 rounded-md text-sm text-gray-800"
                          />
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {multicurrency ? "USD" : ""} per account
                      </span>
                      {multicurrency && (
                        <Tooltip text="This amount will be converted to the local currency of the connected account.">
                          <div class="p-2 -ml-3">
                            <InfoIcon12 />
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  </div>

                  {/* Platform Daily Limit */}
                  <div className="flex space-x-15">
                    <div className="basis-1/3 shrink-0 max-w-[300px] space-y-1">
                      <h3 className="font-semibold text-sm text-gray-800">
                        Platform daily limit
                      </h3>
                      <p className="text-sm text-gray-500">
                        The total amount of Instant Payouts across all connected
                        accounts.
                      </p>
                    </div>
                    <div className="flex-1 space-y-5">
                      <div className="max-w-[550px] space-y-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden"></div>
                        <div className="flex justify-between text-sm text-gray-700">
                          <span>$0.00 today</span>
                          <span>$10,000.00 limit</span>
                        </div>
                      </div>
                      <Button variant="secondary" size="default">
                        Request daily limit increase
                      </Button>
                      <p className="text-sm text-gray-500">
                        Daily limits are reset at midnight UTC.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Modal */}
      <AccountsModal
        isOpen={showAccountsModal}
        onClose={() => setShowAccountsModal(false)}
        accounts={getFilteredAccounts()}
        title="Eligible Accounts"
        audienceType={audienceType}
        criteria={getActiveCriteria()}
      />

      {/* Eligibility Info Modal */}
      <EligibilityInfoModal
        isOpen={showEligibilityInfoModal}
        onClose={() => setShowEligibilityInfoModal(false)}
      />

      {/* API Integration Modal */}
      <ApiIntegrationModal
        isOpen={showApiIntegrationModal}
        onClose={() => setShowApiIntegrationModal(false)}
        onConfirm={() => {
          setShowApiIntegrationModal(false);
          // TODO: Implement actual API integration logic
        }}
      />

      {/* Floating Control Panel */}
      <div
        className={`fixed bottom-4 right-4 bg-white border border-gray-300 p-1 rounded-lg shadow-lg z-50 transition-transform duration-300 ease-in-out hover:shadow-xl`}
        style={{
          transform: controlPanelExpanded
            ? "translateY(0)"
            : "translateY(calc(100% - 40px))",
        }}
      >
        {/* Header - always visible */}
        <div
          className="flex items-center gap-2 cursor-pointer p-3 bg-white transition transition-100 hover:bg-gray-50 rounded-md"
          onClick={() => setControlPanelExpanded(!controlPanelExpanded)}
        >
          <SettingsIcon />
          <h3 className="text-sm font-semibold text-gray-800 mr-auto">
            Prototype controls
          </h3>
          <div className={`text-gray-500 transition-transform duration-200`}>
            {controlPanelExpanded ? <MinusIcon /> : <PlusIcon />}
          </div>
        </div>

        {/* Expandable Content */}
        <div
          className={`${
            controlPanelExpanded ? "opacity-100" : "opacity-0"
          } p-3 pt-2`}
        >
          <div className="space-y-3">
            <div className="space-y-3">
              <ControlPanelToggle
                checked={multicurrency}
                onChange={setMulticurrency}
                label="Multicurrency"
              />

              <ControlPanelToggle
                checked={pricingConfigured}
                onChange={setPricingConfigured}
                label="Pricing configured"
              />

              <ControlPanelToggle
                checked={existingApiIntegration}
                onChange={setExistingApiIntegration}
                label="Existing API integration"
              />
            </div>
          </div>
        </div>
      </div>

      {/* API Integration Modal */}
      <ApiIntegrationModal
        isOpen={showApiIntegrationModal}
        onClose={() => setShowApiIntegrationModal(false)}
        onConfirm={() => {
          setShowApiIntegrationModal(false);
          // TODO: Implement actual API integration logic
        }}
      />
    </div>
  );
};

// Main Prototype3 Component - Onboarding Flow
function Prototype3() {
  return <OnboardingStep1 />;
}

// Export the settings page separately for potential future use
export { SettingsPage };
export default Prototype3;
