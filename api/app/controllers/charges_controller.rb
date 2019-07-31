class ChargesController < ApplicationController
  def create
    
    # check the present token

    @amount = 4000 # get data from form client

    charge = Stripe::Charge.create({
      amount: @amount,
      description: "Kampu - Sports Field booking",
      currency: "usd",
      source: params[:token]
    });

    # return the response
  
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end
end
