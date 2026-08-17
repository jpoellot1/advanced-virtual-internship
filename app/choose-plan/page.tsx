'use client'
import {useState} from 'react'
import PricingTop from '../Assets/pricing-top.png'
import Image from 'next/image'
import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import AccordionItem from './accordionItem';
import { createCheckoutSession } from '../components/stripePayment';
import { useAuth } from '../components/useAuth';
import { useAppDispatch } from '../Redux/lib/hooks';
import { openAuthModal } from '../Redux/authModalSlice';

export default function Sales() {
    const [planType, setPlanType] = useState('annual')
    const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const {user}= useAuth()


    const handleUpgrade = async(priceId: string) => {
      if(!user) {
        dispatch(openAuthModal('login'))
        return
      };
      setLoadingPriceId(priceId)
      try { 
        await createCheckoutSession(user.uid, priceId)
      } catch(err: any) { 
        console.error('Failed to redirect to Stripe Checkout')
        setLoadingPriceId(null)
      }
    }

  return (
    <div id="_next">
      <div className="wrapper wrapper__full">
        <div className="plan">
          <div className="plan__header--wrapper">
            <div className="plan__header">
              <div className="plan__title">
                Get unlimited access to many amazing books to read
              </div>
              <div className="plan__sub--title">
                Turn ordinary moments into amazing learning opportunities
              </div>
              <figure className="plan__img--mask">
                <Image src={PricingTop} alt="pricing"></Image>
              </figure>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="plan__features--wrapper">
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <AiFillFileText />
                  </figure>
                  <div className="plan__features--text">
                    <b>Key ideas in a few min</b> with many books to read
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <RiPlantFill />
                  </figure>
                  <div className="plan__features--text">
                    <b>3 million</b> people growing with Summarist every day
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <FaHandshake />
                  </figure>
                  <div className="plan__features--text">
                    <b>Precise recommendations</b> collections curated by experts
                  </div>
                </div>
              </div>
              <div className="section__title">
                Choose the plan that fits you
              </div>
              { planType === 'annual' ? (
              <>
              <div className="plan__card plan__card--active">
                <div className="plan__card--circle">
                    <div className="plan__card--dot"></div> 
                </div>
                <div className="plan__card__content">
                  <div className="plan__card--title">Premium Plus Yearly</div>
                  <div className="plan__card--price">$99.99/year</div>
                  <div className="plan__card--text">
                    7-day free trial included
                  </div>
                </div>
              </div>
              <div className="plan__card--separator">
                <div className="plan__separator">or</div>
              </div>
              <div className="plan__card" onClick={() => setPlanType('monthly')}>
                <div className="plan__card--circle"></div>
                <div className="plan__card__content">
                  <div className="plan__card--title">Premium Monthly</div>
                  <div className="plan__card--price">$9.99/month</div>
                  <div className="plan__card--text">No trial included</div>
                </div>
              </div>
              <div className="plan__card--cta">
                <span className="btn--wrapper">
                  <button className="btn plan__btn" onClick={() => handleUpgrade('price_1U4jkbAbHbV1mNv9i0kfV8fG')}>
                    {loadingPriceId === 'price_1U4jkbAbHbV1mNv9i0kfV8fG' ? (
                      <span><ImSpinner8 className='animate__spin'/></span>
                    ):(
                      <span>Start your 7-day free trial</span>
                    )}
                  </button>
                </span>
                <div className="plan__disclaimer">
                  Cancel your trial at any time before it ends and you won't be
                  charged.
                </div>
              </div>
              </>
              ): planType === 'monthly' ? (
              <>
              <div className="plan__card"onClick={() => setPlanType('annual')}>
                <div className="plan__card--circle">
                </div>
                <div className="plan__card__content">
                  <div className="plan__card--title">Premium Plus Yearly</div>
                  <div className="plan__card--price">$99.99/year</div>
                  <div className="plan__card--text">
                    7-day free trial included
                  </div>
                </div>
              </div>
              <div className="plan__card--separator">
                <div className="plan__separator">or</div>
              </div>
              <div className="plan__card plan__card--active">
                <div className="plan__card--circle">
                    <div className="plan__card--dot"></div>
                </div>
                <div className="plan__card__content">
                  <div className="plan__card--title">Premium Monthly</div>
                  <div className="plan__card--price">$9.99/month</div>
                  <div className="plan__card--text">No trial included</div>
                </div>
              </div>
              <div className="plan__card--cta">
                <span className="btn--wrapper">
                  <button className="btn plan__btn" onClick={() => handleUpgrade('price_1U4jqXAbHbV1mNv92MpQDumu')}>
                    {loadingPriceId === 'price_1U4jqXAbHbV1mNv92MpQDumu' ? (
                      <span><ImSpinner8 className='animate__spin'/></span>
                    ):(
                      <span>Start your first month</span>
                    )}
                  </button>
                </span>
                <div className="plan__disclaimer">
                  Cancel your trial at any time before it ends and you won't be
                  charged.
                </div>
              </div>
              </>  
              ):<></>
            }
              <div className="faq__wrapper">
                <AccordionItem 
                    title={"How does the free 7-day trial work?"}
                    content={`Begin your complimentary 7-day trial with a Summarist
                    annual membership. You are under no obligation to continue
                    your subscription, and you will only be billed when the
                    trial period expires. With Premium access, you can learn
                    at your own pace and as frequently as you desire, and you
                    may terminate your subscription prior to the conclusion of
                    the 7-day free trial.`}
                />
                <AccordionItem 
                    title= {`Can I switch subscriptions from monthly to yearly or yearly to monthly?`}
                    content={`While an annual plan is active, it is not feasible to
                    switch to a monthly plan. However, once the current month
                    ends, transitioning from a monthly plan to an annual plan
                    is an option.`}
                />
                <AccordionItem 
                    title={`What's included in the Premium plan?`}
                    content={`Premium membership provides you with the ultimate
                    Summarist experience, including unrestricted entry to many
                    best-selling books high-quality audio, the ability to
                    download titles for offline reading, and the option to
                    send your reads to your Kindle.`}
                />
                <AccordionItem 
                    title={`Can I cancel during my trial or subscription?`}
                    content={`You will not be charged if you cancel your trial before
                    its conclusion. While you will not have complete access to
                    the entire Summarist library, you can still expand your
                    knowledge with one curated book per day.`}
                />
              </div>
            </div>
          </div>
          <section id="footer">
            <div className="container">
              <div className="row">
                <div className="footer__top--wrapper">
                  <div className="footer__block">
                    <div className="footer__link--title">Actions</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Magazine</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Cancel Subscription</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Help</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Contact us</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Useful Links</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Pricing</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Summarist Business</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Gift Cards</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Authors & Publishers</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Company</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">About</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Careers</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Partners</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Code of Conduct</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer__block">
                    <div className="footer__link--title">Other</div>
                    <div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Sitemap</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Legal Notice</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Terms of Service</a>
                      </div>
                      <div className="footer__link--wrapper">
                        <a className="footer__link">Privacy Policies</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer__copyright--wrapper">
                  <div className="footer__copyright">
                    Copyright &copy; 2026 Summarist.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
