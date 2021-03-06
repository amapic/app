import React from "react";
import { BarChart, YAxis, Bar } from "recharts";
import { waitFor, render, screen, getByText, cleanup } from "@testing-library/react";
import { Graph_count_type_planete, Count_annee, Graph_masse_distance, Table, GraphiqueSystemeSolaire } from '../../component_planet/graph_planet';
import Dashboard from '../../pages/planet'
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
import { mount, render as renderEnzyme } from 'enzyme';
jest.setTimeout(60000)


jest.mock('react-resize-detector', () => ({
    ...jest.requireActual('react-resize-detector'),
    'useResizeDetector': jest.fn(() => ({width:0,height:0,ref:null}))
}));
describe("Graph et titre", () => {
    describe("Graph", () => {
        describe("Liste système solaire", () => {
            let graphContainer;
            beforeEach(() => {
                const { container } = render(
                    <div>
                        <Table />
                    </div>
                );
                graphContainer = container;

            });

            test("il y a plus de 2 lignes dans le tableau", async () => {
                await waitFor(() => {
                    const bars = graphContainer.querySelectorAll(".table-row")
                    expect(bars.length).toBeGreaterThan(2)

                }, { timeout: 10000 });

            });

            // test("la première ligne a une couleur différente", async () => {
            //   await waitFor(() => {
            //     const bars = document.querySelector(".table-row")
            //     expect(bars.text()).not.toBe(''); 
            //     console.log(document);
            //   }, { timeout: 10000 });

            // });

            // test.each`
            //     index |  type        
            //     ${0}  |  ${"col1"} 
            //     ${1}  |  ${"col2"} 
            //     ${2}  |  ${"col3"} 
            //     ${2}  |  ${"col4"} 
            //   `
            //   ("le titre des types est affiché", async ({ index, type }) => {
            //     await waitFor(() => {
            //       const bars = graphContainer.querySelector(".table-row " +type)
            //       expect(bars.text()).not.toBe(''); 
            //     }, { timeout: 10000 });

            //   });


        });

        describe("Graph type de planète", () => {

            let graphContainer;
            beforeEach(() => {
              const { container } = render(
                <div>
                  <Graph_count_type_planete />
                </div>
              );
              graphContainer = container;
            });
      
      
            test.each`
              index |  type        
              ${0}  |  ${"super-jupiter"} 
              ${1}  |  ${"terrestre"} 
              ${2}  |  ${"jupiter"} 
              ${3}  |  ${"super-terre"} 
              ${4}  |  ${"neptune"} 
            `
              ("le titre des types est affiché", async ({ index, type }) => {
                // waits for rectangles to appear due to animation in graph library
                await waitFor(() => {
                    // navigationEnabled.mockReturnValueOnce({width:0,height0,ref:null});
                  expect(getByText(graphContainer, type)).toHaveTextContent(
                    type
                  )
      
                }, { timeout: 5000 });
      
              });
      
      
          });
        });
      
        describe("Graph planète découverte par an", () => {
      
          let graphContainer;
          beforeEach(() => {
            const { container } = render(
              <div>
                <Count_annee />
              </div>
            );
            graphContainer = container;
          });
      
          test("les barres sont affichés", async () => {
            await waitFor(() => {
              const bars = graphContainer.querySelectorAll(".recharts-rectangle")
              expect(bars.length).toBeGreaterThan(25)
            }, { timeout: 3000 });
      
      
          });
      
        });
      
        describe("Graph Masse distance", () => {
        //   const data = [40, 60];
        //   const size = { width: 500, height: 1000 };
      
          let graphContainer;
          beforeEach(() => {
            const { container } = render(
              <div>
                <Graph_masse_distance />
              </div>
            );
            graphContainer = container;
          }, { timeout: 5000 });
      
      
          test.each`
              index |  type        
              ${0}  |  ${"0.01 Mjup"} 
              ${1}  |  ${"365 jour"} 
              ${2}  |  ${"10 jour"} 
              ${3}  |  ${"1 jour"} 
              ${4}  |  ${"1 Mjup"} 
              ${5}  |  ${"100 Mjup"} 
              ${6}  |  ${"10 Mjup"} 
              ${7}  |  ${"0.01 Mjup"} 
            `
            ("les légendes sont oks", async ({ index, type }) => {
              // waits for rectangles to appear due to animation in graph library
              await waitFor(() => {
                expect(getByText(graphContainer, type)).toBeInTheDocument();
      
              }, { timeout: 5000 });
      
            });
    });

    describe.skip("Titre", () => {
        let graphContainer;
        let texte;
        afterEach(cleanup)

        beforeEach(() => {
            useRouter.mockImplementation(() => ({
                pathname: '/planet'
            }))
            const { container, screen } = render(
                <div>
                    <Dashboard />
                </div>
            );
            graphContainer = container;
        }, { timeout: 5000 });


        it("Titre Contenu Chiffre", async () => {
            await waitFor(() => {
                texte = screen.getByTestId("testid1")
                expect(texte).toBeInTheDocument();

            }, { timeout: 3000 });

        })

        it("Titre Contenu Chiffre", async () => {
            await waitFor(() => {
                texte = screen.getByTestId("testid2")
                expect(texte).toBeInTheDocument();

            }, { timeout: 3000 });

        })

    })
});