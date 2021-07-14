import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  DelegateChanged,
} from "../generated/Contract/Contract"
import { Delegate } from "../generated/schema"


export function handleDelegateChanged(event: DelegateChanged): void {
  let delegatee = event.params.toDelegate;
  let delegateeDetails = Delegate.load(delegatee.toHex());
  if (delegateeDetails === null) {
    delegateeDetails = new Delegate(delegatee.toHex());
    delegateeDetails.delegators = new Array<Bytes>();
  }
  let delegators = delegateeDetails.delegators;
  delegators.push(event.params.delegator);
  delegateeDetails.delegators = delegators;
  delegateeDetails.save();
}
