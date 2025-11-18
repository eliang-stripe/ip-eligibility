import React, { useState, useEffect } from "react";
import connectedAccountsData from "../data/connected_accounts.json";
import cactusImg from "./assets/cactus.png";
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
  CheckCircleIcon,
} from "./icons";
import { Accordion, CodeBlock, Button } from "./components";

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {
        <div
          className={`${
            isVisible ? "opacity-100" : "opacity-0"
          } transition transition-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 text-sm text-gray bg-white rounded-md z-50 shadow-lg max-w-[300px] w-max`}
        >
          <p>{text}</p>
        </div>
      }
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

const Footer = ({ isPricingSetUp }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-0 right-0 bg-white border-t border-gray-200 py-3 z-10 w-[calc(100%-228px)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="relative inline-block">
          <button
            className={`py-2 px-3 text-sm rounded-lg font-medium bg-indigo-600 text-white ${
              isPricingSetUp
                ? "hover:bg-indigo-700 cursor-pointer"
                : "opacity-50"
            }`}
            onMouseEnter={() => !isPricingSetUp && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            Review and apply changes
          </button>
          {!isPricingSetUp && showTooltip && (
            <div className="absolute bottom-full left-0 mb-2 px-4 py-3 text-sm text-gray-800 bg-white rounded-md shadow-lg max-w-[300px] w-max z-50">
              <p>
                You must{" "}
                <span className="text-indigo-600 cursor-pointer hover:text-indigo-800">
                  set up pricing
                </span>{" "}
                before enabling Instant Payouts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-semibold"
          >
            ×
          </button>
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
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-white shadow-xs border-1 border-gray-300 text-sm font-medium rounded-md hover:border-gray-400 transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// API Integration Info Modal Component
const ApiIntegrationModal = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    api: false,
    embedded: false,
    express: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
          <h2 className="text-lg font-semibold text-gray-900">
            Set up Instant Payouts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-semibold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto max-h-[60vh]">
          <div className="space-y-5 text-sm text-gray-700">
            <div className="">
              <Accordion
                title="Express dashboard"
                isExpanded={expandedSections.express}
                onToggle={() => toggleSection("express")}
              >
                <p>
                  Express dashboard automatically applies any changes you make
                  to eligibility criteria and daily limits. No additional setup
                  is required.
                </p>
              </Accordion>

              <Accordion
                title="Embedded components"
                isExpanded={expandedSections.embedded}
                onToggle={() => toggleSection("embedded")}
              >
                <p>
                  [This content is AI-generated] If you're using Connect
                  embedded components, you can configure Instant Payouts
                  settings directly within your embedded UI. This allows your
                  connected accounts to manage their own payout preferences
                  while respecting the eligibility rules you've defined.
                  <CodeBlock variant="block" className="mt-4">
                    {`instant_payouts?: "dashboard_eligibility" | "custom_eligibility" | "disabled",`}
                  </CodeBlock>
                </p>
              </Accordion>
              <Accordion
                title="API integration"
                isExpanded={expandedSections.api}
                onToggle={() => toggleSection("api")}
              >
                <p>
                  [This content is AI-generated] Use the{" "}
                  <CodeBlock variant="inline">
                    instant_payout_eligibility
                  </CodeBlock>{" "}
                  endpoint to safely check an account's eligibility status based
                  on the criteria you've set.
                  <CodeBlock variant="block" className="mt-4">
                    {`GET /v1/accounts/{id}/instant_payout_eligibility`}
                  </CodeBlock>
                </p>
              </Accordion>
            </div>
            <p>
              Need additional help? View the integration guide on{" "}
              <span className="text-indigo-600 cursor-pointer hover:text-indigo-800">
                Stripe Docs
              </span>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-4">
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-white shadow-xs border-1 border-gray-300 text-sm font-medium rounded-md hover:border-gray-400 transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              variant="default"
              className="px-3 py-1.5 bg-indigo-600 text-white  text-sm font-medium rounded-md hover:border-gray-400 transition-all cursor-pointer"
            >
              View integration guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Prototype5() {
  const audienceType = "criteria"; // Always use criteria-based eligibility
  const [accountAge, setAccountAge] = useState(true);
  const [payoutVolume, setPayoutVolume] = useState(true);
  const [payoutNumber, setPayoutNumber] = useState(true);
  const [dailyLimit, setDailyLimit] = useState("500.00");

  // Control panel state
  const [multicurrency, setMulticurrency] = useState(true);
  const [isPricingSetUp, setIsPricingSetUp] = useState(false);
  const [pricingOwner, setPricingOwner] = useState("platform"); // "platform" or "stripe"
  const [controlPanelExpanded, setControlPanelExpanded] = useState(false);

  // Country filtering state
  const [selectedCountries, setSelectedCountries] = useState({
    us: false,
    uk: false,
    ca: false,
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
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showPricingSavedMessage, setShowPricingSavedMessage] = useState(false);
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

  // Update country selection when multicurrency changes
  useEffect(() => {
    if (!multicurrency) {
      // When multicurrency is disabled, only show US
      setSelectedCountries({
        us: true,
        uk: false,
        ca: false,
        es: false,
        fr: false,
      });
    }
  }, [multicurrency]);

  return (
    <div className="min-h-screen bg-white flex flex-row">
      <Sidebar />

      <div className="w-full h-screen flex flex-col min-w-0 relative pb-20 pt-16 overflow-scroll ">
        <div className="max-w-[1280px] w-full flex flex-col relative mx-auto">
          <Header />
          <Footer isPricingSetUp={isPricingSetUp} />

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

              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Instant Payouts eligibility
                </h2>
                <p className="text-sm text-gray-500">
                  Use the controls to determine which accounts are eligible for
                  Instant Payouts.{" "}
                  <span className="text-indigo-600 cursor-pointer hover:text-indigo-800">
                    View integration guide
                  </span>
                </p>
              </div>
              {/* Available Countries Section */}
              <div className="flex space-x-15">
                <div className="basis-1/3 shrink-0 max-w-[300px] space-y-1">
                  <h3 className="font-semibold text-sm text-gray-800">
                    Availability
                  </h3>
                  <p className="text-sm text-gray-500">
                    Choose where Instant Payouts is available.
                  </p>
                </div>
                <div className="max-w-[650px] flex-1">
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
                    />
                    {multicurrency && (
                      <>
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
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Eligibility Filters Section */}
              {Object.values(selectedCountries).some(Boolean) ? (
                <div className="flex space-x-15">
                  <div className="basis-1/3 shrink-0 max-w-[300px] space-y-1">
                    <h3 className="font-semibold text-sm text-gray-800">
                      Eligibility filters
                    </h3>
                    <p className="text-sm text-gray-500">
                      Only accounts that match all of the filters you set will
                      be eligible for Instant Payouts.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      Stripe recommends setting at least one filter to manage
                      risk.{" "}
                      <span className="text-indigo-600 cursor-pointer hover:text-indigo-800">
                        Learn more
                      </span>{" "}
                    </p>
                  </div>
                  <div className="max-w-[650px] flex-1 space-y-3">
                    <Checkbox
                      checked={accountAge}
                      onChange={() => setAccountAge(!accountAge)}
                      label="Account age"
                      showInput={true}
                      inputValue={accountAgeThreshold}
                      onInputChange={handleAccountAgeChange}
                      suffix="days or older"
                    />
                    <div className="space-y-3">
                      <button
                        onClick={() => setPayoutVolume(!payoutVolume)}
                        className="flex items-start space-x-2 text-left w-full cursor-pointer"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <div
                            className={`w-3.5 h-3.5 rounded border ${
                              payoutVolume
                                ? "bg-indigo-600 border-indigo-600"
                                : "border-gray-300 bg-white"
                            } flex items-center justify-center`}
                          >
                            {payoutVolume && (
                              <svg
                                className="w-2 h-2 text-white"
                                fill="none"
                                viewBox="0 0 8 8"
                              >
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
                        <span className="font-medium text-sm text-gray-800">
                          Total payout volume
                        </span>
                      </button>

                      {payoutVolume && (
                        <div className="ml-5 flex items-center space-x-2">
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                              $
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={payoutVolumeThreshold}
                              onChange={(e) =>
                                handlePayoutVolumeChange(e.target.value)
                              }
                              placeholder="10,000.00"
                              className="w-32 pl-6 pr-2 py-1 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-right"
                            />
                          </div>
                          <span className="text-sm text-gray-500">
                            {multicurrency ? "USD" : ""} or greater
                          </span>
                          {multicurrency && (
                            <Tooltip text="This amount will be converted to the local currency of the connected account.">
                              <div className="p-2 -ml-3">
                                <InfoIcon12 />
                              </div>
                            </Tooltip>
                          )}
                        </div>
                      )}
                    </div>
                    <Checkbox
                      checked={payoutNumber}
                      onChange={() => setPayoutNumber(!payoutNumber)}
                      label="Number of lifetime payouts"
                      showInput={true}
                      inputValue={payoutNumberThreshold}
                      onInputChange={handlePayoutNumberChange}
                      suffix="or more payouts"
                    />

                    <div className="text-sm text-gray-700 p-4 bg-gray-50 rounded-md">
                      {eligibleAccountsCount == 200 && "All "}
                      <button
                        onClick={() => setShowAccountsModal(true)}
                        className="cursor-pointer font-[600]"
                      >
                        {eligibleAccountsCount} accounts
                      </button>{" "}
                      are eligible based on these rules. You can manually set
                      eligibility for any account from their account details
                      page.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-15">
                  <div className="basis-1/3 shrink-0 max-w-[300px]"></div>
                  <div className="max-w-[650px] flex-1">
                    <div className="text-sm text-gray-700 p-4 bg-gray-50 rounded-md">
                      {eligibleAccountsCount == 200 && "All "}
                      <button
                        onClick={() => setShowAccountsModal(true)}
                        className="cursor-pointer font-[600]"
                      >
                        {eligibleAccountsCount} accounts
                      </button>{" "}
                      are eligible based on these rules. You can manually set
                      eligibility for any account from their account details
                      page.
                    </div>
                  </div>
                </div>
              )}

              {/* Daily Limit */}
              <div className="flex space-x-15">
                <div className="basis-1/3 shrink-0 max-w-[300px] space-y-1">
                  <h3 className="font-semibold text-sm text-gray-800">
                    Daily limit per account
                  </h3>
                  <p className="text-sm text-gray-500">
                    The maximum amount that each connected account can instantly
                    pay out each day.
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
                        onChange={(e) => handleDailyLimitChange(e.target.value)}
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
                  {/* Info banner - only show when pricing owner is Platform */}
                  {pricingOwner === "platform" && (
                    <div className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3">
                      <InfoIcon />
                      <p className="text-sm text-gray-700">
                        This setting applies to{" "}
                        <span className="text-indigo-600">X</span> connected
                        accounts that you own pricing for.
                      </p>
                    </div>
                  )}

                  {!isPricingSetUp ? (
                    <>
                      {/* Not set up - Show "Set up pricing scheme" button */}
                      <button
                        onClick={() => setShowPricingModal(true)}
                        className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-all cursor-pointer"
                      >
                        Set up pricing scheme
                      </button>
                      {/* Warning message */}
                      <div className="flex items-center space-x-2 text-[#B13600]">
                        <AlertIcon12 />
                        <span className="text-sm">
                          You must set up pricing before enabling Instant
                          Payouts.
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Set up - Show "Edit pricing scheme" button */}
                      <button
                        onClick={() => setShowPricingModal(true)}
                        className="px-3 py-1.5 bg-white shadow-xs border-1 border-gray-300 text-sm font-medium rounded-md hover:border-gray-400 transition-all cursor-pointer"
                      >
                        Edit pricing scheme
                      </button>
                      {/* Success message */}
                      {showPricingSavedMessage && (
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircleIcon />
                          <span className="text-sm">Pricing scheme saved</span>
                        </div>
                      )}
                    </>
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
                    The maximum amount that all of your connected accounts can
                    instantly pay out each day.
                  </p>
                </div>
                <div className="flex-1 space-y-5">
                  <div className="max-w-[550px] space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>$4242.42 today</span>
                      <span>$10,000.00 limit</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Daily limits are reset at midnight UTC.{" "}
                    <span className="text-indigo-600 cursor-pointer hover:text-indigo-800">
                      Contact us
                    </span>{" "}
                    to request a daily limit increase.
                  </p>
                </div>
              </div>
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
      />

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-10">
          <div className="bg-white w-full h-full flex flex-col rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Instant Payouts pricing scheme
              </h2>
              <button
                onClick={() => setShowPricingModal(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-6">
              {/* Empty for now */}
              <div class="bg-black/5 rounded-xl p-6 w-full h-full flex items-center justify-center">
                Pricing scheme will go here
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end">
              <button
                onClick={() => {
                  setIsPricingSetUp(true);
                  setShowPricingModal(false);
                  setShowPricingSavedMessage(true);
                }}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-all cursor-pointer"
              >
                Save pricing scheme
              </button>
            </div>
          </div>
        </div>
      )}

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

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-700">Is pricing set up</span>
                <select
                  value={isPricingSetUp ? "yes" : "no"}
                  onChange={(e) => setIsPricingSetUp(e.target.value === "yes")}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-700">Pricing owner</span>
                <select
                  value={pricingOwner}
                  onChange={(e) => setPricingOwner(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="platform">Platform</option>
                  <option value="stripe">Stripe</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prototype5;
