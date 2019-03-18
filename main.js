$(() => {
  /**
   * Sets up the table reservation system in the HTML
   */
  class UI {
    constructor() {
      this.floorPlan = new FloorPlan(9);
      this.selectedTable;
    }

    /**
     * Calls the appropiate setup functions
     */
    setupUI() {
      // Set up the modal
      this.setupModal();

      // Go set up the tables
      this.setupTables();
    }

    /**
     * Sets up the tables, their event listeners, and their CSS classes
     */
    setupTables() {
      for (let table of this.floorPlan.tables) {
        // Add the table to the HTML
        $('.tables')
          .append(`<div class="table ${table.available  ? 'available' : 'reserved'}" id="table-${table.id}">${table.id}</div>`);

        // Add the event listener to the table we just added
        $(`#table-${table.id}`).on('click', () => {
          if (table.available) {
            this.showModal(table.id); // We only support reservations
          }
        });
      }
    }

    /**
     * Sets up the modal's close and save button listeners
     */
    setupModal() {
      // Handle the save button on the modal
      $('#buttonSave').on('click', () => {
        this.onClickSaveReservation();
      });

      // Handle the "x" button on the modal
      $('#modalClose').on('click', this.hideModal);
      $('.modal').on('click', (e) => {
        if (e.target === e.currentTarget) { // If you click outside of .modal-inner, we close the modal
          this.hideModal();
        }
      });
    }

    /**
     * Shows the modal with information about the selected table
     * @param {number} tableId The id of the selected table
     */
    showModal(tableId) {
      this.selectedTable = this.floorPlan.tables[tableId - 1]; // Table number starts at 1, array at 0
      $('.modal').fadeIn();
      $('#selected-table-number').text(tableId);
    }

    /**
     * Adds the hide class to the modal
     * and clears the selected table.
     */
    hideModal(event) {
      $('.modal').fadeOut();
      this.selectedTable = undefined;
    }

    /**
     * Reserves the selected table
     * Clears the tables HTML
     * And redraws all of the tables to show any new reserved ones
     */
    onClickSaveReservation() {
      if (this.selectedTable !== undefined) {
        this.selectedTable.toggleAvailability();
        $('.tables').html(''); // Clear the HTML
        this.setupTables(); // Now redraw
        this.hideModal();
      } 
    }
  }

  /**
   * Create a floor plan with reserable tables for your restaraunt.
   */
  class FloorPlan {
    /**
     * A floor plan with a set number of tables
     * @param {number} numOfTables The number of tables in the floor plan
     */
    constructor(numOfTables) {
      this.tables = [];
      for (let i = 1; i <= numOfTables; i++) {
        this.tables.push(
          new Table(i)
        );
      }
    }
  }

  /**
   * Represents a restaraunt table
   */
  class Table {
    /**
     * A table that can be reserved
     * @param {number} id The id of the table
     * @param {boolean} available Is the table available to reserve?
     */
    constructor(id, available = true) {
      this.id = id;
      this.available = available;
    }

    toggleAvailability() {
      this.available = !this.available;
    }
  }

  /** Actually create the app and run the setup function */
  let ui = new UI();
  ui.setupUI();
});