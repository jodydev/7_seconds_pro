import { CheckIcon } from "@heroicons/react/20/solid";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import supabase from "../supabase/client";
import { useTranslation } from "react-i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UpgradePlan() {
  const { t } = useTranslation();
  const [userEmail, setUserEmail] = useState("");

  //! Funzione per recuperare l'ID dell'utente attualmente loggato
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data.user;

        setUserEmail(user.email);
      } catch (error) {
        console.error(
          "Errore durante il recupero dell'ID dell'utente:",
          error.message
        );
      }
    };

    fetchUserData();
  }, []);

  const tiers = [
    {
      name: t("Free"),
      id: "tier-freelancer",
      href: "#",
      priceMonthly: "€0",
      description: t("The essentials to provide your best work for clients."),
      features: [t("Up to 10 CVs per month")],
      mostPopular: false,
      buyPlan: t("Your current plan"),
    },
    {
      id: 2,
      name: "Standard",
      priceId: "price_1PIBttFezQmx9aELpJr12Feq",
      href: `https://buy.stripe.com/7sI3cWaaack58Ok28c?prefilled_email=${userEmail}`,
      priceMonthly: "€47,58",
      description: t("A plan that scales with your rapidly growing business."),
      features: [t("Up to 100 CVs per month")],
      mostPopular: true,
      buyPlan: t("Buy plan"),
    },
    {
      name: "Premium",
      id: "tier-enterprise",
      href: `https://buy.stripe.com/eVabJsdmm83P2pW28d?prefilled_email=${userEmail}`,
      priceMonthly: "€120,78",
      description: t("Dedicated support and infrastructure for your company."),
      features: [t("Up to 300 CVs per month")],
      mostPopular: false,
      buyPlan: t("Buy plan"),
    },
  ];

  return (
<div data-aos="fade-up">
  <div className="bg-white py-10 px-6 sm:px-10 md:px-20 2xl:py-60">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold leading-7 text-indigo-600">
          {t("Pricing")}
        </h2>
        <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          {t("Pricing plans for teams of all sizes")}
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-base sm:text-lg leading-8 text-gray-600">
        {t("Whether you're a freelancer or a large enterprise, there's a plan that's right for you.")}
      </p>
      <div className="isolate mx-auto mt-8 sm:mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:gap-y-0 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-0 gap-x-0">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
              tierIdx === 0 ? "lg:rounded-r-none" : "",
              tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
              "flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-gray-200 xl:p-10"
            )}
          >
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                    "text-lg font-semibold leading-8"
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="flex items-center justify-center text-nowrap rounded-full bg-indigo-600/10 p-3 py-1 text-xs font-semibold leading-5 text-indigo-600">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.priceMonthly}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  /month
                </span>
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                  : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              )}
            >
              {tier.buyPlan}
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
}
