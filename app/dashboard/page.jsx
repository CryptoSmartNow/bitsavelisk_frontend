'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import bit from '../bitdash.module.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import { ethers } from 'ethers';
import BitsaveABI from '../../artifacts/contracts/Bitsave.sol/Bitsave.json'; // Ensure this path is correct

export default function Dashboard({ router }) {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

  const [selectedPenalty, setSelectedPenalty] = useState(1);
  const [savingsName, setSavingsName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ethereum');

  const handlePenaltyClick = (penaltyValue) => {
    setSelectedPenalty(penaltyValue);
  };

  // Function to handle creation of savings plan
  const handleCreateSavings = async () => {
    if (!window.ethereum) {
      console.error('MetaMask is not installed!');
      return;
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();

    const contractAddress = '0x01f0443DaEC78fbaBb2D0927fEdFf5C20a4A39b5';
    const contract = new ethers.Contract(contractAddress, BitsaveABI.abi, signer); // Use BitsaveABI.abi

    try {
      const maturityTime = selectedDayRange.to ? Math.floor(new Date(selectedDayRange.to.year, selectedDayRange.to.month - 1, selectedDayRange.to.day).getTime() / 1000) : 0;
      const amountInWei = ethers.utils.parseUnits(amount || "0", "ether");

      const tx = await contract.createSaving(
        savingsName,
        maturityTime,
        selectedPenalty,
        false,
        currency, // Token address to save (adjust this as needed)
        amountInWei
      );

      await tx.wait();

      console.log('Savings created successfully!');
    } catch (error) {
      console.error('Error creating savings:', error);
    }
  };
  
  return (
    <section className={bit.containerMain}>
      <div className={bit.container} id="app">
        <div className={bit.bit_holder}>
          <div className={bit.bit_header}>
            <div className={bit.item}>
              <Image
                src="/dp.png"
                width={500}
                height={500}
                alt="User DP"
              />
              <span className={bit.text}>Hello Kelvin&nbsp;👋<br /><span className={bit.username}></span></span>
            </div>
            <div className={bit.item}>
              <div className={bit.hamburger_menu}>&#9776;</div>
            </div>
          </div>
          <div className={bit.inner_div}>
            <div className={bit.bit_glassy}>
              <div className={bit.glass_div}>
                <span className={bit.glass_text}><i className="fas fa-wallet" style={{ margin: '5px', color: '#9ADFC3' }}></i>Total Locked
                  Value</span>
              </div>
              <div className={bit.amount}>$ 0<span className="smaller">.00</span></div>
            </div>
            <button className={bit.create_button} id="openModalButton" onClick={handleCreateSavings}><i className="fas fa-plus"
              style={{ color: '#fff', margin: '5px' }}></i>Create Savings
              Plan</button>
          </div>
          <div className={bit.bit_savings}>
            <div className={bit.header_description}>
              <h3>My Savings 💰</h3>
            </div>
            <div className={bit.search_box}>
              <input type="text" placeholder="Search savings here..." className={bit.search_input} />
              <button className={bit.search_button}><i className="fas fa-search"></i></button>
            </div>
          </div>
        </div>
        <div className={bit.tab_nav}>
          <div className={`${bit.tab_item} ${bit.active}`} style={{ marginRight: '10px' }}>
            Current
            <div className={`${bit.tab_indicator} ${bit.active}`}></div>
          </div>
          <div className={bit.tab_item}>
            Completed
            <div className={bit.tab_indicator}></div>
          </div>
        </div>

        <div className={bit.bit_card}>
          <div className={bit.row}>
            <div className={bit.car_icon}>
              <div className={bit.square_div}>
                <i className="fas fa-car-side" style={{ color: '#687A7F', fontSize: '25px', marginRight: '15px' }}></i>
              </div>
            </div>
            <div className={bit.description}>
              <span className={bit.description_bold}>New Car</span><br />
              <span style={{ color: '#B4BCBF', fontSize: '10px' }}>Created 05/25/01</span>
            </div>
            <div className={bit.top_up_section}>
              <button className={bit.top_up_button}>
                <i className="fas fa-plus" style={{ fontSize: '10px' }}></i> Top Up
              </button>
            </div>
          </div>
          <hr className={bit.separator} />
          <div className={bit.additional_info}>
            <span className={bit.saved_amount}>$276 saved</span>
            <div className={bit.vertical_separator}></div>
            <span className={bit.reward}>+1500 BTS reward</span>
          </div>
          <div className={bit.progress_bar}>
            <div className={bit.progress} style={{ width: '35%', backgroundColor: '#81D7B4' }}></div>
          </div>
          <div className={bit.progress_text}>
            35%<span className={bit.progress_info} style={{ color: '#C0C0C0', fontSize: '12px' }}>3 Months and 23 Days Remaining</span>
          </div>
        </div>
        <div className={bit.no_plan_card} style={{ marginBottom: '100px' }}>
          <div className={bit.row}>
            <div className={bit.spinner_icon}>
              <i className="fas fa-spinner fa-spin" style={{ textAlign: 'center' }}></i>
            </div>
          </div>
          <div className={bit.custom_description}>
            Oops! No more saving plan to show.
          </div>
        </div>

        <div id="modalContainer" className={bit.modal_container}>
          <div className={bit.modal_content}>
            <div className={bit.modal_header}>
              <h2>Step 01</h2>
              <div className={bit.modal_vertical_separator}></div>
              <div className={bit.step_circles}>
                <div className={`${bit.circle} ${bit.active}`}>1</div>
                <div className={`${bit.modal_horizontal_separator} ${bit.active}`}></div>
                <div className={bit.circle}>2</div>
                <div className={bit.modal_horizontal_separator}></div>
                <div className={bit.circle}>3</div>
              </div>
            </div>
            <div className={bit.savings_container}>
              <div className={bit.content}>
                <div className={bit.header}>
                  <div className={bit.dot}></div>
                  <h4 className={bit.h4Class}>Savings Name and Amount</h4>
                </div>
                <input
                  type="text"
                  id="savings-name"
                  placeholder="Name your savings plan"
                  className={bit.input_text}
                  value={savingsName}
                  onChange={(e) => setSavingsName(e.target.value)}
                />
                <div className={bit.input_row}>
                  <input
                    type="text"
                    id="deposit-amount"
                    placeholder="$000,000.00"
                    className={bit.input_text}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className={bit.currency_dropdown}>
                    <select
                      id="currency"
                      className={bit.currency_select}
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="0x0000000000000000000000000000000000000000">ETH</option>
                      <option value="bitcoin">Algo</option>
                      <option value="ethereum">USDT</option>
                      <option value="litecoin">gAlgo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className={bit.button_row}>
              <button className={bit.back_button} id="closeModalButton">Close</button>
              <button className={bit.next_button} id="nextModalButton">Next</button>
            </div>
          </div>
        </div>

        <div id="modal2" className={bit.savo}>
          <div className={bit.savings_content}>
            <div className={bit.modal_header}>
              <h2>Step 02</h2>
              <div className={bit.modal_vertical_separator}></div>
              <div className={bit.step_circles}>
                <i className="fas fa-check-circle" style={{ color: '#81D7B4' }}></i>
                <div className={`${bit.modal_horizontal_separator} ${bit.active}`}></div>
                <div className={bit.circle}>2</div>
                <div className={bit.modal_horizontal_separator}></div>
                <div className={bit.circle}>3</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex', margin: 'auto' }}>
                <Calendar
                  value={selectedDayRange}
                  onChange={setSelectedDayRange}
                  minimumDate={utils().getToday()}
                  calendarClassName="responsive_calendar"
                  shouldHighlightWeekends
                />
              </div>
            </div>

            <div className={bit.savings_duration} id="savings-duration">
              <div className={bit.content}>
                <div className={bit.header}>
                  <div className={bit.dot}></div>
                  <h4 className={bit.h4Class}>Penalty</h4>
                  <small style={{ fontSize: '12px', color: '#687A7F' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                </div>
              </div>
              <div className={bit.penalty_row}>
                <div
                  className={`${bit.penalty} ${selectedPenalty === 1 ? bit.active : ''}`}
                  onClick={() => handlePenaltyClick(1)}
                >
                  1%
                </div>
                <div
                  className={`${bit.penalty} ${selectedPenalty === 2 ? bit.active : ''}`}
                  onClick={() => handlePenaltyClick(2)}
                >
                  2%
                </div>
                <div
                  className={`${bit.penalty} ${selectedPenalty === 3 ? bit.active : ''}`}
                  onClick={() => handlePenaltyClick(3)}
                >
                  3%
                </div>
                <div
                  className={`${bit.penalty} ${selectedPenalty === 4 ? bit.active : ''}`}
                  onClick={() => handlePenaltyClick(4)}
                >
                  4%
                </div>
                <div
                  className={`${bit.penalty} ${selectedPenalty === 5 ? bit.active : ''}`}
                  onClick={() => handlePenaltyClick(5)}
                >
                  5%
                </div>
              </div>

              <div className={bit.button_row}>
                <button className={bit.back_button} id="backModalButton">Back</button>
                <button className={bit.next_button} id="next_button">Next</button>
              </div>
            </div>
          </div>
        </div>

        <div id="modalContainer3" className={bit.modal_container}>
          <div className={bit.modal_content}>
            <div className={bit.modal_header}>
              <h2>Step 03</h2>
              <div className={bit.modal_vertical_separator}></div>
              <div className={bit.step_circles}>
                <i className="fas fa-check-circle" style={{ color: '#81D7B4' }}></i>
                <div className={`${bit.modal_horizontal_separator} ${bit.active}`}></div>
                <i className="fas fa-check-circle" style={{ color: '#81D7B4' }}></i>
                <div className={bit.modal_horizontal_separator}></div>
                <div className={bit.circle}>3</div>
              </div>
              <div className={bit.savings_container}>
                <div className={bit.content}>
                  <div className={bit.header}>
                    <div className={bit.dot}></div>
                    <h4 className={bit.h4Class}>Preview</h4>
                  </div>
                  <p>This ought to show the preview of your savings but i am just testing</p>
                </div>
              </div>
              <div className={bit.button_row}>
                <button className={bit.back_button} id="lastModalButton">Back</button>
                <button className={bit.next_button} id="create_modal">Create</button>
              </div>
            </div>
          </div>
        </div>

        <div id="final_modal" className={bit.final_container}>
          <div className={bit.final_content}>
            <div style={{ textAlign: 'center' }}>
              <Image
                src="/success.png"
                width={100}
                height={100}
                alt="User DP"
                className={bit.create_image}
              />
              <h5 style={{ textAlign: 'center', color: '#364D54', fontStyle: 'normal', fontWeight: '900', fontSize: '18px' }}>
                Transaction Successful
              </h5>
            </div>
            <div className={bit.final_button_row}>
              <button className={bit.final_back_button} id="lastModalButton">Explorer <i className="fas fa-external-link-alt"
                style={{ marginLeft: '10px' }}></i></button>
              <button className={bit.final_next_button} id="close_transaction">Close</button>
            </div>
          </div>
        </div>
      </div>
      <Script src="/js/bitsave.js" />
      <Script src="/js/calendar.js" />
    </section>
  );
}
