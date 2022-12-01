import { ModalTokenComponent } from './../modal-token/modal-token.component';
import {
  Component,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '../interfaces/store';

export interface Periods {
  dayWeek: number;
  initialTime: string;
  endTime: string;
}

export enum PeriodsEnum {
  dom = 0,
  seg = 1,
  ter = 2,
  qua = 3,
  qui = 4,
  sex = 5,
  sab = 6,
}

@Component({
  selector: 'app-form-array-test',
  templateUrl: './form-array-test.component.html',
  styleUrls: ['./form-array-test.component.scss'],
})
export class FormArrayTestComponent implements OnInit, OnChanges {
  form: FormGroup;

  panelOpenState = false;
  storeId!: '123123xxx-123123-xxxx';
  idRappi = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  idIfood = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

  periods: Periods[] = [
    {
      dayWeek: 0,
      initialTime: '',
      endTime: '',
    },
    {
      dayWeek: 1,
      initialTime: '',
      endTime: '',
    },
    {
      dayWeek: 2,
      initialTime: '',
      endTime: '',
    },
    {
      dayWeek: 3,
      initialTime: '',
      endTime: '',
    },
    {
      dayWeek: 4,
      initialTime: '',
      endTime: '',
    },
    {
      dayWeek: 5,
      initialTime: '',
      endTime: '',
    },
    {
      dayWeek: 6,
      initialTime: '',
      endTime: '',
    },
  ];
  periodsSelecteds: Periods[] = [];
  isSelected!: number | string;
  indexPeriod?: number | string;
  initialTime = '';
  endTime = '';
  disableDay = false;
  clickedDay = false;

  listModality: any[] = [
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afAA', name: 'Modalidade 1' },
    { id: 2, name: 'Modalidade 2' },
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afBB', name: 'Modalidade 3' },
  ];

  listSalesChannel: any[] = [
    {
      salesChannelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      salesChannelName: 'Rappi',
      modalityId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      modalityName: 'modalidade 1',
    },
    {
      salesChannelId: '3fa85f64-5717-4562-b3fc-2c963f66af33',
      salesChannelName: 'canal 2',
      modalityId: '3fa85f64-5717-4562-b3fc-2c963f66af33',
      modalityName: 'modalidade 2',
    },
  ];

  dataStores: Store[] = [
    {
      storeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      storeName: 'NOME',
      storeType: {
        id: 0,
        name: 'string',
        nickName: 'string',
        active: true,
      },
      brand: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        image: 'string',
        active: true,
      },
      storeAddress: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        storeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        street: 'string',
        number: 'string',
        zipCode: 'string',
        additional: 'string',
        neighborhood: 'string',
        city: 'string',
        state: 'string',
        country: 'string',
        latitude: 0,
        longitude: 0,
        urlMaps: 'string',
      },
      contacts: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'string',
          email: 'string',
          phone: 0,
          contactTypeId: 0,
          contactTypeName: 'string',
        },
      ],
      storeModalitys: [
        {
          storeModalityId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          storeCode: 'code store 1',
          cashierCode: 'code store 1',
          modality: {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afAA',
            name: 'string',
            tag: 'string',
            active: true,
            order: 0,
            canBlock: true,
          },
          openingHours: [
            {
              id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              storeModalityId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              dayWeek: 0,
              initialTime: '10:00',
              endTime: '15:00',
            },
          ],
          salesChannel: [
            {
              storeModalitySalesChannelId:
                '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              salesChannelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              salesChannelName: 'string',
              token: '',
            },
          ],
        },
      ],
    },
  ];

  salesChannel: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private renderer: Renderer2
  ) {
    this.form = this.formBuilder.group({
      stores: this.formBuilder.array([]),
    });
  }

  get getMyFormArray(): FormArray {
    return this.form.get('stores') as FormArray;
  }

  ngOnInit(): void {
    this.dataStores.map(item =>
      item.storeModalitys.forEach(() => {
        this.add();
      })
    );

    this.patchValues(this.dataStores);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  onClickPeriods(
    day: { initialTime: string; endTime: string },
    index: string,
    lero: number,
    lero2: number
  ) {
    this.isSelected = index;
    this.indexPeriod = index;

    const initialTime = day.initialTime.substring(0, 8);
    const endTime = day.endTime.substring(0, 8);

    switch (lero) {
      case PeriodsEnum.dom:
        this.initialTime = initialTime;
        this.endTime = endTime;
        break;
      case PeriodsEnum.seg:
        this.initialTime = initialTime;
        this.endTime = endTime;
        break;
      case PeriodsEnum.ter:
        this.initialTime = initialTime;
        this.endTime = endTime;
        break;
      case PeriodsEnum.qua:
        this.initialTime = initialTime;
        this.endTime = endTime;
        break;
      case PeriodsEnum.qui:
        this.initialTime = initialTime;
        this.endTime = endTime;
        break;
      case PeriodsEnum.sex:
        this.initialTime = initialTime;
        this.endTime = endTime;
        break;
      case PeriodsEnum.sab:
        this.initialTime = initialTime;
        this.endTime = endTime;
        break;
      default:
        this.initialTime = '';
        this.endTime = '';
        break;
    }

    this.focoInputInitialTime(lero2);
  }

  private focoInputInitialTime(lero2: number) {
    this.renderer.selectRootElement(`#initialTime${lero2}`).focus();
  }

  onChangeTime(event: any, type: string) {
    const indexExternal = this.indexPeriod;
    let initialTime = '';
    let endTime = '';

    if (type === 'initialTime') {
      initialTime = event.target.value;
    } else {
      endTime = event.target.value;
    }

    this.periods = this.periods.map((item: Periods, index: number) =>
      index === indexExternal
        ? {
            ...item,
            initialTime: initialTime ? initialTime : item.initialTime,
            endTime: endTime ? endTime : item.endTime,
          }
        : item
    );
  }

  getDescription(value: number) {
    return PeriodsEnum[value];
  }

  patchValues(data: Store[]): void {
    const res = data.map((item, index1) =>
      item.storeModalitys.map((res, index2) => {
        return {
          id: 1,
          storeModality: {
            storeId: data[index1].storeId,
            modalityId: data[index1].storeModalitys[index1].modality.id,
            storeCode: data[index1].storeModalitys[index1].storeCode,
            cashierCode: data[index1].storeModalitys[index1].cashierCode,
          },
          openingHours: res.openingHours.map(
            ({ dayWeek, initialTime, endTime }) => {
              return {
                dayWeek: dayWeek,
                initialTime: initialTime,
                endTime: endTime,
              };
            }
          ),
          salesChannel: res.salesChannel.map(({ salesChannelId, token }) => {
            return {
              salesChannelId: salesChannelId,
              token: token,
            };
          }),
        };
      })
    );

    const stores = res.flatMap(item => item);

    const periods = stores.map((item, i) => {
      return {
        dayWeek: item.openingHours[i].dayWeek,
        initialTime: item.openingHours[i].initialTime,
        endTime: item.openingHours[i].endTime,
      };
    });

    this.form.patchValue({ stores });
    this.periods = this.mountGetPeriods(periods);
  }

  private mountGetPeriods(periods: Periods[]): Periods[] {
    return this.periods.map((item: Periods, index) => {
      const dayOfWeek = periods.find(item => item.dayWeek === index);

      if (dayOfWeek) {
        return dayOfWeek;
      } else {
        return item;
      }
    });
  }

  getOpeningHoursFormArray(form: any): FormArray {
    return form.get('openingHours') as FormArray;
  }

  getSalesChannelFormArray(form: any): FormArray {
    return form.get('salesChannel') as FormArray;
  }

  selectedChannels(event: any): void {
    const value = event.source.value;
    const isSelected = event.source.selected;
    const canal = this.idIfood ? 'iFood' : 'Rappi';

    // Abrir modal para incluir token
    if (
      (isSelected && value === this.idIfood) ||
      (isSelected && value === this.idRappi)
    ) {
      this.matDialog
        .open(ModalTokenComponent, {
          width: '400px',
          data: {
            title: `Insira o Token para o ${canal}`,
          },
        })
        .afterClosed()
        .subscribe(value => {
          if (value) {
            console.log('Com Token:', value);
          } else {
            console.log('Sem Token:', value);
          }
          this.parseSalesChannel(this.form, value); // remover daqui da condição
        });
    }
  }

  parseSalesChannel(lero: any, token: string) {
    // esse zero abaixo é a posiçao do index do form. alterar depois que tiver o id la certinho,
    // dai da pra fazer um findIndex pra pegar a posiçao de quem quer alterar ou algo do tipo
    const listSalesChannel: [] =
      lero.value.stores[0].salesChannel[0].salesChannelId;
    console.log(listSalesChannel);

    listSalesChannel.forEach(saleChannelId => {
      const foundSalesChannel = !!this.salesChannel.find(
        ({ salesChannelId: id }) => id == saleChannelId
      );

      console.log(foundSalesChannel, saleChannelId);

      if (!foundSalesChannel) {
        console.log('adicionado saleChannel');

        this.salesChannel.push({
          salesChannelId: saleChannelId,
          token,
        });
      }

      // Remover quando desmarcar um canal (find + pop)
    });

    console.log(this.salesChannel);
  }

  add() {
    this.getMyFormArray.push(this.getModalityForGroup());
  }

  getModalityForGroup(): FormGroup {
    return this.formBuilder.group({
      id: this.getMyFormArray.controls.length + 1,
      storeModality: this.formBuilder.group({
        storeId: ['', Validators.required],
        modalityId: ['', Validators.required],
        storeCode: [''],
        cashierCode: [''],
      }),
      openingHours: this.formBuilder.array([
        this.formBuilder.group({
          dayWeek: 1,
          initialTime: [''],
          endTime: [''],
        }),
      ]),
      salesChannel: this.formBuilder.array([
        this.formBuilder.group({
          salesChannelId: [''],
          token: [''],
        }),
      ]),
    });
  }

  remove(index: number): void {
    this.getMyFormArray.removeAt(index);
  }
}
