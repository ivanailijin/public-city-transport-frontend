import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { CustomerPersonalizedTicketOut, CustomerUnpersonalizedTicketOut, Personalized, PersonalizedOut, Unpersonalized, UnpersonalizedOut } from './model/ticket.model';
import { PagedResults } from 'src/app/shared/model/paged-results';
import { Wallet, WalletOut } from './model/wallet.model';
import { PersonalizedTicketRequest } from './model/request.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

//TICKETS
  addLineToTicket(ticketId: number, lineId: number): Observable<any> {
    return this.http.get(`${environment.apiHost}ticket/addLine/${ticketId}/${lineId}`);
  }

  addLinesToTicket(ticketId: number, lineIds: number[]): Observable<any> {
    return this.http.post(`${environment.apiHost}ticket/addLines/${ticketId}`, lineIds);
  }

  removeLineFromTicket(ticketId: number, lineId: number): Observable<any> {
    return this.http.get(`${environment.apiHost}ticket/removeLine/${ticketId}/${lineId}`);
  }

//UNPERSONALIZED
getAllUnpersonalized(): Observable<PagedResults<Unpersonalized>> {
  return this.http.get<PagedResults<Unpersonalized>>(environment.apiHost + 'unpersonalized/getAll');
}

createUnpersonalized(unpersonalized: Unpersonalized): Observable<Unpersonalized> {
  return this.http.post<Unpersonalized>(environment.apiHost + 'unpersonalized/create', unpersonalized);
}

updateUnpersonalized(unpersonalized: Unpersonalized): Observable<Unpersonalized> {
  return this.http.put<Unpersonalized>(environment.apiHost + 'unpersonalized/update/' + unpersonalized.id, unpersonalized)
}

deleteUnpersonalized(id: number): Observable<Unpersonalized> {
  return this.http.delete<Unpersonalized>(environment.apiHost + 'unpersonalized/delete/' + id);
}

getUnpersonalizedWithRelations(unpersonalizedId: number): Observable<UnpersonalizedOut> {
  return this.http.get<UnpersonalizedOut>(environment.apiHost + 'unpersonalized/getWithRelations/' + unpersonalizedId);
}

getAllUnpersonalizedWithRelations(): Observable<UnpersonalizedOut[]> {
  return this.http.get<UnpersonalizedOut[]>(environment.apiHost + 'unpersonalized/getAllWithRelations');
}

buyUnpersonalizedOneTimeTicket(customerId: number, ticketId: number, departureId: number): Observable<any> {
  return this.http.get<any>(`${environment.apiHost}unpersonalized/buyUnpersonalizedOneTimeTicket/${customerId}/${ticketId}/${departureId}`);
}

buyUnpersonalizedTicket(customerId: number, ticketId: number): Observable<any> {
  return this.http.get<any>(`${environment.apiHost}unpersonalized/buyUnpersonalizedTicket/${customerId}/${ticketId}`);
}

getCustomerUnpersonalizedTickets(customerId: number): Observable<CustomerUnpersonalizedTicketOut[]> {
  return this.http.get<CustomerUnpersonalizedTicketOut[]>(environment.apiHost + 'unpersonalized/getCustomerUnpersonalizedTickets/' + customerId);
}

getLineUnpersonalizedTickets(lineId: number): Observable<Unpersonalized[]> {
  return this.http.get<Unpersonalized[]>(environment.apiHost + 'unpersonalized/getLineUnpersonalizedTickets/' + lineId);
}


//PERSONALIZED
getAllPersonalized(): Observable<PagedResults<Personalized>> {
  return this.http.get<PagedResults<Personalized>>(environment.apiHost + 'personalized/getAll');
}

createPersonalized(personalized: Personalized): Observable<Personalized> {
  return this.http.post<Personalized>(environment.apiHost + 'personalized/create', personalized);
}

updatePersonalized(personalized: Personalized): Observable<Personalized> {
  return this.http.put<Personalized>(environment.apiHost + 'personalized/update/' + personalized.id, personalized)
}

deletePersonalized(id: number): Observable<Personalized> {
  return this.http.delete<Personalized>(environment.apiHost + 'personalized/delete/' + id);
}

getPersonalizedWithRelations(personalizedId: number): Observable<PersonalizedOut> {
  return this.http.get<PersonalizedOut>(environment.apiHost + 'personalized/getWithRelations/' + personalizedId);
}

getAllPersonalizedWithRelations(): Observable<PersonalizedOut[]> {
  return this.http.get<PersonalizedOut[]>(environment.apiHost + 'personalized/getAllWithRelations');
}

buyPersonalizedTicket(customerId: number, ticketId: number): Observable<any> {
  return this.http.get(`${environment.apiHost}personalized/buyPersonalizedTicket/${customerId}/${ticketId}`);
}

getCustomerPersonalizedTickets(customerId: number): Observable<CustomerPersonalizedTicketOut[]> {
  return this.http.get<CustomerPersonalizedTicketOut[]>(environment.apiHost + 'personalized/getCustomerPersonalizedTickets/' + customerId);
}

//WALLET
createWallet(wallet: Wallet): Observable<Wallet> {
  return this.http.post<Wallet>(environment.apiHost + 'wallet/create', wallet);
}

updateWallet(wallet: Wallet): Observable<Wallet> {
  return this.http.put<Wallet>(environment.apiHost + 'wallet/update/' + wallet.id, wallet)
}

getWalletByCustomerId(customerId: number): Observable<WalletOut> {
  return this.http.get<WalletOut>(environment.apiHost + 'wallet/getByCustomerId/' + customerId);
}

//PERSONALIZED TICKET REQUESTS
getAllPersonalizedTicketRequests(): Observable<PagedResults<PersonalizedTicketRequest>> {
  return this.http.get<PagedResults<PersonalizedTicketRequest>>(environment.apiHost + 'personalizedTicketRequest/getAll');
}

createPersonalizedTicketRequests(personalizedTicketRequest: PersonalizedTicketRequest): Observable<PersonalizedTicketRequest> {
  return this.http.post<PersonalizedTicketRequest>(environment.apiHost + 'personalizedTicketRequest/create', personalizedTicketRequest);
}

updatePersonalizedTicketRequests(personalizedTicketRequest: PersonalizedTicketRequest): Observable<PersonalizedTicketRequest> {
  return this.http.put<PersonalizedTicketRequest>(environment.apiHost + 'personalizedTicketRequest/update/' + personalizedTicketRequest.id, personalizedTicketRequest)
}

approvePersonalizedTicketRequest(requestId: number, adminId: number): Observable<PersonalizedTicketRequest> {
  return this.http.get<PersonalizedTicketRequest>(`${environment.apiHost}personalizedTicketRequest/approvePersonalizedRequest/${requestId}/${adminId}`);
}

rejectPersonalizedTicketRequest(requestId: number, adminId: number): Observable<PersonalizedTicketRequest> {
  return this.http.get<PersonalizedTicketRequest>(`${environment.apiHost}personalizedTicketRequest/rejectPersonalizedRequest/${requestId}/${adminId}`);
}
}
